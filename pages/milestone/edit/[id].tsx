import styles from '../../../styles/Home.module.css'
import { MilestoneProps } from '../../../prisma/types';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import prisma from '../../../lib/prisma';
import { useRouter } from 'next/router'
import Layout from '../../../components/layout';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MilestoneEditForm from '../../../components/milestone_edit_form';

type Props = {
  milestone: MilestoneProps
}

export default function EditMilestone({milestone}: Props) {
  const router = useRouter()
  const [message, setMessage] = useState(''); // This will be used to show a message if the submission is successful
  const [submitted, setSubmitted] = useState(false);
  const handleSent = (milestone: MilestoneProps) => {
    router.push(`/milestone/${milestone?.id}`)
  }

  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Update Milestone
        </h1>
        <div>
          <div hidden={!submitted} className="alert alert-primary" role="alert">
            {message}
          </div>
          <MilestoneEditForm handleSent={handleSent} milestone={milestone} />

        </div>
      </main>
      </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }) => {
  const session = await getSession({ req });
  const id = String(query.id);
  const milestone = await prisma.milestone.findUnique({
    where: { 
      id_and_userId: {
        id: String(id),
        userId: String(session?.user?.id),
      }
    },    
    include: {
      user: {
          select: { name: true, id: true },
      },
    },
  });
  return {
      props: { 
        milestone: JSON.parse(JSON.stringify(milestone)),
        ...(await serverSideTranslations(locale!, ['common']))
       }
  };
};

