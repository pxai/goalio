import Link from "next/link";
import { MilestoneProps } from "../../prisma/types"
type Props = {
    milestone: MilestoneProps;
}
export default function Milestone ({milestone}: Props) {
    return (
        <div>        
            <div>{milestone.title}</div>
            <div>{milestone.content}</div>  
            <span><Link href={`/milestone/${milestone.id}`}>See</Link></span>
            <span><Link href={`/milestone/edit/${milestone.id}`}>Edit</Link></span>
            <span><Link href={`/milestone/delete/${milestone.id}`}>Delete</Link></span>
        </div>
    )
}
