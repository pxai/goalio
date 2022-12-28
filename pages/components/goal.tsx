import Link from "next/link";
import { GoalProps } from "../../prisma/types"
import Milestone from "./milestone";
import { useSession } from 'next-auth/react'; 
import { useRouter } from "next/router";
import MilestoneForm from "./milestone_create_form";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from "react";
import { Button } from "@mantine/core";
import { IconEdit, IconRefresh, IconSquarePlus, IconTrash } from "@tabler/icons";

type Props = {
    goal: GoalProps;
}

export default function Poll (goal : GoalProps) {
  const [showForm, setShowForm] = useState(false);
  const toggleMilestoneForm = () => { setShowForm(!showForm)}
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleDelete = async () => {
    try {
      await fetch(`/api/goal/${goal.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      console.log("deleted")
      await router.push('/');
    } catch (error) {
      console.error(error);
    }
  }

    return (
        <div>
            <h3><Link href={`/goal/${goal.id}`}>{goal.title}</Link></h3>
            <div className='author'>By {goal.owner?.name}</div>
            <p>{goal.content}</p>
            {
              goal.owner?.id === session?.user.id && 
              <Button.Group>
                <Button component="a" href={`/goal/${goal.id}`} compact leftIcon={<IconRefresh size={14} />}>Reload</Button>
                <Button component="a" href={`/goal/edit/${goal.id}`}color="green" compact leftIcon={<IconEdit size={14} />}>Edit</Button>
                <Button component="a" href={`/goal/delete/${goal.id}`} color="red" compact leftIcon={<IconTrash size={14} />}>Delete</Button>
              </Button.Group>
            }

            <h4>Milestones</h4>
            <Button  onClick={toggleMilestoneForm} leftIcon={<IconSquarePlus/>}>
              Add Milestone
            </Button>
            {showForm && <MilestoneForm goalId={goal.id} />}
            
            <ul>
              {
                goal?.milestones?.map(milestone => {
                    return <Milestone key={milestone.id} milestone={milestone} />
                })
              } 
            </ul>
        </div>
    )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
      ...(await serverSideTranslations(locale, ['common']))
  }
});
