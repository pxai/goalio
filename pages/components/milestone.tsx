import Link from "next/link";
import { MilestoneProps } from "../../prisma/types"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common']))
    }
});
