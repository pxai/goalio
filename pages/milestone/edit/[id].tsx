import Link from 'next/link'
import styles from '../../../styles/Home.module.css'
import { GoalProps } from '../../../prisma/types';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import { useFormik } from 'formik';
import prisma from '../../../lib/prisma';
import * as yup from 'yup';
import { useRouter } from 'next/router'
import Layout from '../../components/layout';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type Props = {
  goal: GoalProps
}

export default function EditPoll(props: Props) {
  const router = useRouter()
  const [message, setMessage] = useState(''); // This will be used to show a message if the submission is successful
  const [submitted, setSubmitted] = useState(false);
  const { goal } = props;
  const formik = useFormik({
    initialValues: {
      ...goal
    },
    onSubmit: async (values) => {
      setMessage('Form submitted');
      console.log("Form submitted: ", values)
    try {
      const body = values;
      await fetch(`/api/goal/${goal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await router.push(`/goal/${goal.id}`);
    } catch (error) {
      console.error(error);
    }
      setSubmitted(true);
    },
    validationSchema: yup.object({
      title: yup.string().trim().required('Title is required'),
      content: yup.string().trim().required('Description is required'),
    }),
  });

  const removeMilestones = (index: number) => {
    const updatedMilestones = milestones.slice(0, index).concat(milestones.slice(index + 1))
    console.log("Before: ", formik.values)

    setMilestones(updatedMilestones)
  };

  const addAnswer = () => {
    setMilestones([...milestones, {title: ''}])
  };

  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link href="/">Edit Milestone!</Link>
        </h1>
        <div>
        <div hidden={!submitted} className="alert alert-primary" role="alert">
          {message}
        </div>

        <form className="w-50" onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <div>
              <label htmlFor="title" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Add title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.title && (
                <div className="text-danger">{formik.errors.title}</div>
              )}
            <div>
              <label htmlFor="content" className="form-label">
                Description
              </label>
              <textarea
                name="content"
                className="form-control"
                placeholder="Add content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.errors.content && (
                <div className="text-danger">{formik.errors.content}</div>
              )}
            </div>
            <div>
              <label htmlFor="published" className="form-label">
                Published
              </label>
              <input
                type="checkbox"
                name="published"
                className="form-control"
                value={`${formik.values.published}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            </div>
          </div>
        </form>
        </div>
      </main>
      </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }) => {
  const session = await getSession({ req });
  const id = String(query.id);
  const goal = await prisma.goal.findUnique({
    where: { 
      id_and_ownerId: {
        id: String(id),
        ownerId: String(session?.user?.id),
      }
    },
    include: {
      owner: {
          select: { name: true, id: true },
      },
    },
  });
  return {
      props: { 
        goal: JSON.parse(JSON.stringify(goal)),
        ...(await serverSideTranslations(locale!, ['common']))
       }
  };
};

