import { GetServerSideProps } from 'next';
import Link from 'next/link'
import { getSession } from 'next-auth/react';
import styles from '../styles/Home.module.css'
import prisma from '../lib/prisma';
import { GoalProps } from '../prisma/types';
import { useState } from 'react';
import Layout from '../components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import GoalHeader from '../components/goal_header';
import { Button } from '@mantine/core';
import { IconDatabase, IconEdit, IconEye, IconTrash } from '@tabler/icons';

type Props = {
  goals: GoalProps[]
}

export default function Polls(props: Props) {
  const [goals, setGoals] = useState(props.goals);
  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Published Goals
        </h1>
        <div>
          {
            goals.map((goal) => 
              <div key={goal.id}>              
                <GoalHeader {...goal} />
                <Button.Group>
                  <Button component="a" href={`/goal/${goal.id}`} compact rightIcon={<IconEye />}>See</Button>
                  <Button component="a" href={`/goal/edit/${goal.id}`} color="green" compact  leftIcon={<IconEdit size={14} />}>Edit</Button>
                  <Button component="a" href={`/goal/delete/${goal.id}`} color="red" compact leftIcon={<IconTrash size={14} />}>Delete</Button>
                </Button.Group>
              </div>
            )
          }
        </div>
      </main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, locale }) => {
  const session = await getSession({ req });
  const goals = await prisma.goal.findMany({
    where: { 
      ownerId: String(session?.user?.id),
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
      goals: JSON.parse(JSON.stringify(goals)),
      ...(await serverSideTranslations(locale!, ['common']))
     }
  };
};
