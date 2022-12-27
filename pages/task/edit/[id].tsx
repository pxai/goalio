import Link from 'next/link'
import styles from '../../../styles/Home.module.css'
import { TaskProps } from '../../../prisma/types';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import prisma from '../../../lib/prisma';
import { useRouter } from 'next/router'
import Layout from '../../components/layout';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TaskEditForm from '../../components/task_edit_form';

type Props = {
  task: TaskProps
}

export default function EditTask({task}: Props) {
  const router = useRouter()
  const [message, setMessage] = useState(''); // This will be used to show a message if the submission is successful
  const [submitted, setSubmitted] = useState(false);
  const handleSent = (task: TaskProps) => {
    router.push(`/task/${task.id}`)
  }

  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Update Task
        </h1>
        <div>
          <div hidden={!submitted} className="alert alert-primary" role="alert">
            {message}
          </div>
          <TaskEditForm handleSent={handleSent} task={task} />
        </div>
      </main>
      </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }) => {
  const session = await getSession({ req });
  const id = String(query.id);
  const task = await prisma.task.findUnique({
    where: { 
      id_and_userId: {
        id: String(id),
        userId: String(session?.user?.id),
      }
    },    
    include: {
      user: {
          select: { name: true, id: true },
      },
    },
  });
  return {
      props: { 
        task: JSON.parse(JSON.stringify(task)),
        ...(await serverSideTranslations(locale!, ['common']))
       }
  };
};

