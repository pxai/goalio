import Link from "next/link";
import { TaskProps } from "../../prisma/types"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button } from "@mantine/core";

type Props = {
    task: TaskProps;
}
export default function Task ({ task }: Props) {
    return (
        <div>        
            <div>{task.title}</div>
            <div>{task.content}</div>
            <Button.Group>
                <Button component="a" href={`/task/${task.id}`} compact>See</Button>
                <Button component="a" href={`/task/edit/${task.id}`} color="green" compact>Edit</Button>
                <Button component="a" href={`/task/delete/${task.id}`} color="red" compact>Delete</Button>
            </Button.Group>
        </div>
    )
}

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common']))
    }
});
