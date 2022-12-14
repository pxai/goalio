import prisma from '../../lib/prisma';
import { GetServerSideProps } from "next";
import { getSession } from 'next-auth/react';
import { MilestoneProps } from "../../prisma/types"
import Milestone from "../../components/milestone";
import Header from '../../components/header';
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../components/layout';

type Props = {
  milestone: MilestoneProps;
}

export default function MilestonePage ({ milestone }: Props) {
  return (
    <Layout>
      <main className={styles.main}>
      <Link href={`/goal/${milestone.goalId}`}>Goal</Link>
        <div>
          <Milestone milestone={milestone} contracted={false} />
        </div> 
        </main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }) => {
  const session = await getSession({ req });
  const id = String(query.id);
  console.log("About to get: ", id)
  const milestone = await prisma.milestone.findUnique({
    where: { 
      id
    },
    include: {
      tasks: true
    },
  });
  console.log("See milestone: ", milestone)
  return {
      props: { 
        milestone: JSON.parse(JSON.stringify(milestone)),
        ...(await serverSideTranslations(locale!, ['common']))
       }
  };
};