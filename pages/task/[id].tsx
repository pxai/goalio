import prisma from '../../lib/prisma';
import { GetServerSideProps } from "next";
import { getSession } from 'next-auth/react';
import { TaskProps } from "../../prisma/types"
import Task from "../components/task";
import Header from '../components/header';
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type Props = {
  task: TaskProps;
}

export default function TaskPage ({ task }: Props) {
  return (
    <div className={styles.container}>
    <Header />
    <main className={styles.main}>
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
  console.log("About to get: ", id)
  const task = await prisma.task.findUnique({
    where: { 
      id
    },
  });
  console.log("See task: ", task)
  return {
      props: { 
        task: JSON.parse(JSON.stringify(task)),
        ...(await serverSideTranslations(locale!, ['common']))
       }
  };
};