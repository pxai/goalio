import { GetServerSideProps } from 'next';
import Link from 'next/link'
import { getSession } from 'next-auth/react';
import styles from '../styles/Home.module.css'
import prisma from '../lib/prisma';
import { GoalProps } from '../prisma/types';
import { useState } from 'react';
import Layout from './components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import GoalHeader from './components/goal_header';

type Props = {
  goals: GoalProps[]
}

export default function Polls(props: Props) {
  const [goals, setGoals] = useState(props.goals);
  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Published Goals
        </h1>
        <div>
          {
            goals.map((goal) => 
              <div key={goal.id}>              
                <GoalHeader {...goal} />
                <span><Link href={`/goal/${goal.id}`}>See</Link></span>
                <span><Link href={`/goal/edit/${goal.id}`}>Edit</Link></span>
                <span><Link href={`/goal/delete/${goal.id}`}>Delete</Link></span>
              </div>
            )
          }
        </div>
      </main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, locale }) => {
  const session = await getSession({ req });
  const goals = await prisma.goal.findMany({
    where: { 
      ownerId: String(session?.user?.id),
    },
    include: {
      owner: {
        select: { name: true, id: true },
      },
      milestones: true
    },
  });

  return {
    props: { 
      goals: JSON.parse(JSON.stringify(goals)),
      ...(await serverSideTranslations(locale!, ['common']))
     }
  };
};
