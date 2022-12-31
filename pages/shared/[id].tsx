import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import prisma from '../../lib/prisma';
import { GoalProps } from '../../prisma/types';
import { useState } from 'react';
import Layout from '../../components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type Props = {
  goal: GoalProps
}

export default function Public({goal}: Props) {
  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Published Goal {goal?.title}
        </h1>
        <div>
          <div key={goal?.id}>
            <h3><Link href={`/goal/${goal?.id}`}>{goal?.title}</Link></h3>
            <div><i>{goal?.content}</i></div>
            <div>By {goal?.owner?.name} - {goal?.createdAt}</div>
          </div>
        </div>
      </main>
      </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'clcbqzft60000q7cr3pv61rtw' } } // See the "paths" section below
    ],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const { id } = params;
  const goal = await prisma.goal.findUnique({
    where: { id },
    include: {
      owner: {
        select: { name: true, id: true },
      },
      milestones: true
    },
  });

  return {
    props: { 
      goal: JSON.parse(JSON.stringify(goal)),
      ...(await serverSideTranslations(locale!, ['common'])),
      revalidate: 10,
     }
  };
};
