import { AnswerProps } from "../../prisma/types"
type Props = {
    answer: AnswerProps;
    handleVote: Function;
}
export default function Answer ({ answer, handleVote }: Props) {
    return (
        <div>
            <input type="radio" onChange={() => handleVote(answer.id)} id={`answer_${answer.id}`} name="answer" />
            <label htmlFor={`answer_${answer.id}`}>{answer.title}</label>
        </div>
    )
}
