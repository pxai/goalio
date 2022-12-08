import Link from "next/link";
import { GoalProps } from "../../prisma/types"
import Answer from "./answer";
import { useSession } from 'next-auth/react'; 
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
    poll: GoalProps;
}

export default function Poll (poll : GoalProps) {
  const router = useRouter();
  const [votes, setVotes] = useState([])
  const { data: session, status } = useSession();

  const handleVote = async (answerId: string) => {
    if (!session)
        alert("You must sign in to vote")
    else {
        try {
            const response = await fetch(`/api/vote`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({answerId, pollId: poll.id}),
            });
            const data = await response.json();
            console.log("voted: ", data)
            handleShowVotes();
          } catch (error) {
            console.error(" Error on vote: ", error);
          }
    }
  }

  const handleShowVotes = async () => {
    try {
        const response = await fetch(`/api/poll/${poll.id}/votes`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        console.log("votes:: ", data)
        setVotes(data);
      } catch (error) {
        console.error(" Error on vote: ", error);
      }
  }

  const handleDelete = async () => {
    try {
      await fetch(`/api/poll/${poll.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      console.log("deleted")
      await router.push('/');
    } catch (error) {
      console.error(error);
    }
  }
    return (
        <div>
            <h3><Link href={`/poll/${poll.id}`}>{poll.title}</Link></h3>
            <div className='author'>By {poll.author?.name}</div>
            {
              poll.author?.id === session?.user.id && 
                <div>
                  <Link href={`/poll/edit/${poll.id}`}>Update it</Link>
                  <span onClick={handleDelete}>Delete it</span>
                </div>
            }
            <p>{poll.content}</p>
            {
              votes.length === 0
              ?    
                <ul>
                  {
                    poll.answers.map(answer => {
                        return <Answer key={answer.id} answer={answer} handleVote={handleVote}/>
                    })
                  } 
                </ul>
                :
                <ul>
                  {
                    votes.map(vote => {
                        return <div key={vote.id}>{vote.title}: {vote._count.votes}</div>
                    })
                  } 
                </ul>
            }

        </div>
    )
}

