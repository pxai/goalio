import { GetServerSideProps } from 'next';
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import prisma from '../lib/prisma';
import { GoalProps } from '../prisma/types';
import { useState } from 'react';
// import Goal from './components/goal';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from './components/layout';

type Props = {
  goals: GoalProps[]
}

export default function Home(props: Props) {
  const { t } = useTranslation()
  const [goals, setGoals] = useState(props.goals);
  return (
      <Layout>
        <main className={styles.main}>
          <h1 className={styles.title}>
            <Link href="/">{t('title')}</Link>
          </h1>
          <div>
            {
              goals.map(goal => (
                <div>{goal.id}</div>
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
    orderBy: {
      createdAt: 'desc',
    },
    take: 1,
  });

  return {
    props: { 
      goals: JSON.parse(JSON.stringify(goals)),
      ...(await serverSideTranslations(locale!, ['common']))
    }
  };
};
