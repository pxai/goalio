import Link from "next/link";
import { MilestoneProps } from "../../prisma/types"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Task from "./task";
import TaskForm from "./task_form";
import { useState } from "react";
import { Button, Grid } from "@mantine/core";

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

            <Button.Group>
                <Button component="a" href={`/milestone/${milestone.id}`} compact>See</Button>
                <Button component="a" href={`/milestone/edit/${milestone.id}`} color="green" compact>Edit</Button>
                <Button component="a" href={`/milestone/delete/${milestone.id}`} color="red" compact>Delete</Button>
            </Button.Group>
            <h4>Tasks</h4>
            <div onClick={toggleTaskForm}>Add</div>
            {showForm && <TaskForm milestoneId={milestone.id} />}
            <Grid>
                <Grid.Col span={4}>
                    {
                        milestone?.tasks?.map(task => {
                            return <Task key={task.id} task={task} />
                        })
                    } 
                </Grid.Col>
                <Grid.Col span={4}>2</Grid.Col>
                <Grid.Col span={4}>3</Grid.Col>
            </Grid>
        </div>
    )
}

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common']))
    },
});
