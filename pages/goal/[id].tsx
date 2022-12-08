import prisma from '../../lib/prisma';
import { GetServerSideProps } from "next";
import { PollProps } from "../../prisma/types"
import Poll from "../components/poll";
import Header from '../components/header';
import Nav from '../components/nav';
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type Props = {
  poll: PollProps;
}

export default function PollPage ({ poll }: Props) {
  return (
    <div className={styles.container}>
    <Header />
    <Nav />
    <main className={styles.main}>
      <div>
        <Poll {...poll} />
      </div> 
      </main>
      <footer className={styles.footer}>
          <Link href="https://github.com/pxai/nextjspolls">By Pello</Link>
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const id = String(query.id);
  const poll = await prisma.poll.findUnique({
    where: { id },
    include: {
      author: {
          select: { name: true, id: true },
      },
      answers: true
    },
  });
  return {
      props: { 
        poll: JSON.parse(JSON.stringify(poll)),
        ...(await serverSideTranslations(locale!, ['common']))
       }
  };
};