import prisma from '../../lib/prisma';
import { GetServerSideProps } from "next";
import { getSession } from 'next-auth/react';
import { TaskProps } from "../../prisma/types"
import Task from "../components/task";
import Header from '../components/header';
import styles from '../../styles/Home.module.css'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/layout';

type Props = {
  task: TaskProps;
}

export default function TaskPage ({ task }: Props) {
  return (
    <Layout>
    <Header />
    <main className={styles.main}>
      <div>
        <Task task={task} />
      </div> 
      </main>
    </Layout>
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