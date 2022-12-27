import prisma from '../../../lib/prisma';
import { GetServerSideProps } from "next";
import { getSession } from 'next-auth/react';
import { TaskProps } from "../../../prisma/types"
import { useRouter } from "next/router";
import Header from '../../components/header';
import styles from '../../../styles/Home.module.css'
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Task from '../../components/task';

type Props = {
  task: TaskProps;
}

export default function PollPage ({ task }: Props) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await fetch(`/api/task/${task.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      console.log("deleted")
      await router.push(`/milestone/${task.milestoneId}`);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={styles.container}>
    <Header />
    <main className={styles.main}>
      <button onClick={() => router.push(`/task/${task.id}`)}>Cancel</button>
      <button onClick={handleDelete}>Confirm Deletion</button>
      <div>
        <Task task={task} />
      </div> 
      </main>
      <footer className={styles.footer}>
          <Link href="https://github.com/pxai/nextjspolls">By Pello</Link>
      </footer>
    </div>
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
      }
    },
  });
  return {
      props: { 
        task: JSON.parse(JSON.stringify(task)),
        ...(await serverSideTranslations(locale!, ['common']))
       }
  };
};