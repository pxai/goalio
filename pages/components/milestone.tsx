import Link from "next/link";
import { MilestoneProps } from "../../prisma/types"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Task from "./task";
import TaskForm from "./task_form";
import { useState } from "react";

type Props = {
    milestone: MilestoneProps;
}
export default function Milestone ({milestone}: Props) {
    const [showForm, setShowForm] = useState(false);
    const toggleTaskForm = () => { setShowForm(!showForm)}
    return (
        <div>        
            <div>{milestone.title}</div>
            <div>{milestone.content}</div>  
            <span><Link href={`/milestone/${milestone.id}`}>See</Link></span>
            <span><Link href={`/milestone/edit/${milestone.id}`}>Edit</Link></span>
            <span><Link href={`/milestone/delete/${milestone.id}`}>Delete</Link></span>
            <h4>Tasks</h4>
            <div onClick={toggleTaskForm}>Add</div>
            {showForm && <TaskForm milestoneId={milestone.id} />}
            <ul>
              {
                milestone?.tasks?.map(task => {
                    return <Task key={task.id} task={task} />
                })
              } 
            </ul>
        </div>
    )
}

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common']))
    },
});
