import Link from "next/link";
import { TaskProps } from "../../prisma/types"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Card, Text, Badge, Button, Group } from '@mantine/core';

type Props = {
    task: TaskProps;
}
export default function Task ({ task }: Props) {
    const getColor = (status: string) => ({"TODO": "pink", "DOING": "orange", "DONE": "green"}[status])
    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>  
            <Card.Section mt="md" mb="xs"> 
                <Text weight={500}>{task.title}</Text>
                <Badge color={getColor(task.status)} variant="light">
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

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common']))
    }
});
