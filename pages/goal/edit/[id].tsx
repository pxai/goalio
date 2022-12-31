import Link from 'next/link'
import styles from '../../../styles/Home.module.css'
import { GoalProps } from '../../../prisma/types';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import prisma from '../../../lib/prisma';
import { useRouter } from 'next/router'
import Layout from '../../../components/layout';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import GoalEditForm from '../../../components/goal_edit_form';

type Props = {
  goal: GoalProps
}

export default function EditPoll({goal}: Props) {
  const router = useRouter()
  const [message, setMessage] = useState(''); // This will be used to show a message if the submission is successful
  const [submitted, setSubmitted] = useState(false);
  const handleSent = (goal: GoalProps) => {
    router.push(`/goal/${goal.id}`)
  }

  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Update Goal
        </h1>
        <div>
          <div hidden={!submitted} className="alert alert-primary" role="alert">
            {message}
          </div>
          <GoalEditForm handleSent={handleSent} goal={goal} />

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

