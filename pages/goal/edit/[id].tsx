import Link from 'next/link'
import styles from '../../../styles/Home.module.css'
import { PollProps } from '../../../prisma/types';
import { useState } from 'react';
import { useFormik } from 'formik';
import prisma from '../../../lib/prisma';
import * as yup from 'yup';
import { useRouter } from 'next/router'
import Layout from '../../components/layout';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type Props = {
  poll: PollProps
}

export default function EditPoll(props: Props) {
  const router = useRouter()
  const [message, setMessage] = useState(''); // This will be used to show a message if the submission is successful
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState([{title:''}, {title:''}, {title:''}, {title:''}])
  const { poll } = props;
  const formik = useFormik({
    initialValues: {
      ...poll
    },
    onSubmit: async (values) => {
      setMessage('Form submitted');
      console.log("Form submitted: ", values)
    try {
      const body = values;
      await fetch(`/api/poll/${poll.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await router.push('/');
    } catch (error) {
      console.error(error);
    }
      setSubmitted(true);
    },
    validationSchema: yup.object({
      title: yup.string().trim().required('Name is required'),
      content: yup.string().trim().required('Description is required'),
      answers: yup.array()
      .of(
        yup.object().shape({
          title: yup.string().ensure().required("Answer is required")
        })
      ).min(3, "You need at least 3 answers")
      .required("Add 3 answers")
    }),
  });

  const removeAnswers = (index: number) => {
    const updatedAnswers = answers.slice(0, index).concat(answers.slice(index + 1))
    console.log("Before: ", formik.values)

    setAnswers(updatedAnswers)
  };

  const addAnswer = () => {
    setAnswers([...answers, {title: ''}])
  };

  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Create<Link href="/">Polls!</Link>
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
              {
                answers.map((answer, i) => {
                  return (
                    <div key={i}>
                    <label htmlFor={`answer_${i}`} className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      name={`answers[${i}].title`}
                      className="form-control"
                      placeholder="Add answer"
                      value={formik.values.answers[i]?.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <button onClick={() => removeAnswers(i)} className="btn btn-primary">
                    {' '}
                    </button>
                    </div>
                  )
                })
              }
              <button onClick={addAnswer} className="btn btn-primary">
                Add question
              </button>
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

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const id = String(query.id);
  const poll = await prisma.poll.findUnique({
    where: { id },
    include: {
      author: {
          select: { name: true, id: true },
      },
      answers: true
    },
  });
  return {
      props: { 
        poll: JSON.parse(JSON.stringify(poll)),
        ...(await serverSideTranslations(locale!, ['common']))
       }
  };
};

