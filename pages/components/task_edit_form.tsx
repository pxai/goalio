import { useState } from "react";
import { TaskProps } from "../../prisma/types"
import { useForm } from '@mantine/form';
import { TextInput, Checkbox, Button, Textarea, Group, Box } from '@mantine/core';
import { useRouter } from 'next/router'

type Props = {
    task: TaskProps;
}
export default function TaskEditForm ({ task }: Props) {
    const [message, setMessage] = useState(''); // This will be used to show a message if the submission is successful
    const [submitted, setSubmitted] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('')
    const router = useRouter()

    const form = useForm({
      initialValues: {
        title: task.title,
        content: task.content,
        completed: task.completed,
        milestoneId: task?.milestoneId
      },
  
      validate: {
        title: (value) => (/[\w]{3,}/.test(value) ? null : 'Title required'),
        content: (value) => (/[\w]{3,}/.test(value) ? null : 'Content required'),
      },
    });

    const handleSubmit =  async () => {
      setMessage('Sending');
      console.log("Form submitted: ", form.values)
    try {
      const body = { ...form.values };
      await fetch(`/api/task/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch (error) {
      console.error(error);
    }
      setMessage('Sent');
      setSubmitted(true);
      router.push(`/milestone/${task.milestoneId}`)
    }

    return (
        <div>
{message}
  <Box sx={{ maxWidth: 300 }} mx="auto">

  </Box>
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
            <Checkbox
              mt="md"
              label="Completed?"
              {...form.getInputProps('completed', { type: 'checkbox' })}
            />
            </div>
            <div>
            <Button type="submit" disabled={message === 'Sending'}>Update Task</Button>
            </div>
          </div>
        </form>
        </div>
    )
}
