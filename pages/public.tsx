import { GetServerSideProps } from 'next';
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import prisma from '../lib/prisma';
import { GoalProps } from '../prisma/types';
import { useState } from 'react';
import Layout from './components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type Props = {
  goals: GoalProps[]
}

export default function Public(props: Props) {
  const [goals, setGoals] = useState(props.goals);
  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Published Goals
        </h1>
        <div>
          {
            goals.map((goal) => (
              <div key={goal.id}>
                <h3><Link href={`/goal/${goal.id}`}>{goal.title}</Link></h3>
                <div><i>{goal.content}</i></div>
                <div>By {goal.owner?.name} - {goal.createdAt}</div>
              </div>
            ))
          }
        </div>
      </main>
      </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const goals = await prisma.goal.findMany({
    where: { published: true },
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
