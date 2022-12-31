import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { GoalProps } from '../prisma/types';
import { useState } from 'react';
import { useRouter } from 'next/router'
import Layout from '../components/layout';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import GoalForm from '../components/goal_form';

type Props = {
  goals: GoalProps[]
}

export default function AddGoal(props: Props) {
  const router = useRouter()
  const [message, setMessage] = useState(''); // This will be used to show a message if the submission is successful
  const [submitted, setSubmitted] = useState(false);
  const handleSent = (goal: GoalProps) => {
    router.push(`/goal/${goal.id}`)
  }

  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Create<Link href="/">Goals!</Link>
        </h1>
        <div>
          <div hidden={!submitted} className="alert alert-primary" role="alert">
            {message}
          </div>
          <GoalForm handleSent={handleSent} />

        </div>
      </main>
      </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: { 
      ...(await serverSideTranslations(locale!, ['common']))
    }
  };
};

