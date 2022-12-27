import { useState } from "react";
import { useForm } from '@mantine/form';
import { TextInput, Checkbox, Button, Textarea, Group, Box } from '@mantine/core';
import { MilestoneProps } from "../../prisma/types";
import { useRouter } from "next/router";

type Props = {
    handleSent: Function;
    milestone: MilestoneProps
}
export default function MilestoneEditForm ({ milestone }: Props) {
    const [message, setMessage] = useState(''); // This will be used to show a message if the submission is successful
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter()
    console.log("Dale: ", milestone)
    const form = useForm({
      initialValues: {
        id: milestone.id,
        title: milestone.title,
        content: milestone.content,
        completed: milestone?.completed,
        goalId: milestone.goalId
      },
  
      validate: {
        title: (value) => (/^\w+$/.test(value) ? null : 'Title required'),
        content: (value) => (/^\w+$/.test(value) ? null : 'Content required'),
      },
    });

    const handleSubmit =  async () => {
      setMessage('Sending');
      console.log("Form submitted: ", form.values)
    try {
      const body = { ...form.values };
      await fetch(`/api/milestone/${milestone.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch (error) {
      console.error(error);
    }
      setMessage('Sent');
      setSubmitted(true);
      router.push(`/goal/${milestone.goalId}`)
    }

    return (
      <div>
    {message}
      <Box sx={{ maxWidth: 300 }} mx="auto">
      <form className="w-50" onSubmit={form.onSubmit(handleSubmit)}>
              <div className="mb-3">
                <div>
                  <TextInput
                    label="Title"
                    name="title"
                    placeholder="Add title"
                    {...form.getInputProps('title')}
                  />
                </div>
                <div>
                  <Textarea
                    name="content"
                    label="Description"
                    placeholder="Add description"
                    {...form.getInputProps('content')}
                  />
                </div>
                <div>
                </div>
                <div>
                <Button type="submit" disabled={message === 'Sending'}>Create Milestone</Button>
                </div>
              </div>
            </form>

      </Box>
    </div>
  )
}