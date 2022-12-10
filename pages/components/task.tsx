import Link from "next/link";
import { TaskProps } from "../../prisma/types"
type Props = {
    task: TaskProps;
}
export default function Milestone ({ task }: Props) {
    return (
        <div>        
            <div>{task.title}</div>
            <div>{task.content}</div>  
            <span><Link href={`/task/${task.id}`}>See</Link></span>
            <span><Link href={`/task/edit/${task.id}`}>Edit</Link></span>
            <span><Link href={`/task/delete/${task.id}`}>Delete</Link></span>
        </div>
    )
}
