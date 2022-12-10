import Link from "next/link";
import { GoalProps } from "../../prisma/types"
import Milestone from "./milestone";
import { useSession } from 'next-auth/react'; 
import { useRouter } from "next/router";

type Props = {
    goal: GoalProps;
}

export default function GoalHeader (goal : GoalProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

    return (
      <div>
        <h3><Link href={`/goal/${goal.id}`}>{goal.title}</Link></h3>
        <div><i>{goal.content}</i></div>
        <div>By {goal.owner?.name} - {goal.createdAt}</div>
      </div>
    )
}

