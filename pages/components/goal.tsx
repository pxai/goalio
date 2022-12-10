import Link from "next/link";
import { GoalProps } from "../../prisma/types"
import Milestone from "./milestone";
import { useSession } from 'next-auth/react'; 
import { useRouter } from "next/router";
import MilestoneForm from "./milestone_form";

type Props = {
    goal: GoalProps;
}

export default function Poll (goal : GoalProps) {
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
            {
              goal.owner?.id === session?.user.id && 
                <div>
                  <Link href={`/goal/edit/${goal.id}`}>Update it</Link>
                  <span onClick={handleDelete}>Delete it</span>
                </div>
            }
            <p>{goal.content}</p>
            <h4>Milestones</h4>
            <ul>
              {
                goal.milestones.map(milestone => {
                    return <Milestone key={milestone.id} milestone={milestone} />
                })
              } 
            </ul>
            <MilestoneForm goalId={goal.id} />
        </div>
    )
}

