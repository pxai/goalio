import Link from "next/link";
import { TaskProps } from "../prisma/types"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Card, Text, Badge, Button, Group, createStyles, RingProgress } from '@mantine/core';
import { IconFreeRights } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
    deleteButton: {
        width: '30px',
        float: 'right',
        color: 'red',
    },
}));

type Props = {
    task: TaskProps;
}
export default function Task ({ task }: Props) {
    const { classes } = useStyles();
    const getColor = (status: string) => ({"TODO": "pink", "DOING": "orange", "DONE": "green"}[status])
    return (
        <Card shadow="sm" mb={4} radius="md" withBorder>  
            <Card.Section mt="md" p={4} > 
                <Text weight={500}>{task.title}</Text>
                <Badge color={getColor(task.status)} className={classes.deleteButton} variant="light" >
                    {task.status}
                </Badge>
            </Card.Section>
            <Text size="sm" color="dimmed">{task.content}</Text>
            <Card.Section>
                <Button.Group>
                    <Button component="a" href={`/task/${task.id}`} compact>See</Button>
                    <Button component="a" href={`/task/edit/${task.id}`} color="green" compact>Edit</Button>
                    <Button component="a" href={`/task/delete/${task.id}`} color="red" compact>Delete</Button>
                </Button.Group>
            </Card.Section>
        </Card>
    )
}
