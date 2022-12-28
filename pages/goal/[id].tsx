import prisma from '../../lib/prisma';
import { GetServerSideProps } from "next";
import { getSession } from 'next-auth/react';
import { GoalProps } from "../../prisma/types"
import Goal from "../components/goal";
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/layout';

type Props = {
  goal: GoalProps;
}

export default function GoalPage ({ goal }: Props) {
  return (
    <Layout>
    <main className={styles.main}>
      <div>
        <Goal {...goal} />
      </div> 
      </main>
      <footer className={styles.footer}>
          <Link href="https://github.com/pxai/nextjspolls">By Pello</Link>
      </footer>
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
      milestones: true
    },
  });
  return {
      props: { 
        goal: JSON.parse(JSON.stringify(goal)),
        ...(await serverSideTranslations(locale!, ['common']))
       }
  };
};