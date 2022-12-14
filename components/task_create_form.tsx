import { useState } from "react";
import { TaskProps } from "../prisma/types"
import { useForm } from '@mantine/form';
import { TextInput, Checkbox, Button, Textarea, Group, Box, Radio } from '@mantine/core';

type Props = {
    milestoneId: string;
}
export default function TaskCreateForm ({ milestoneId }: Props) {
    const [message, setMessage] = useState(''); // This will be used to show a message if the submission is successful
    const [submitted, setSubmitted] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('')

    const form = useForm({
      initialValues: {
        title: '',
        content: '',
        status: 'TODO'
      },
  
      validate: {
        title: (value) => (/^[\w\W]{3,}$/.test(value) ? null : 'Title min required'),
        content: (value) => (/^[\w\W]{3,}$/.test(value) ? null : 'Content required'),
      },
    });

    const handleSubmit =  async () => {
      setMessage('Sending');
      console.log("Form submitted: ", form.values)
      const {title, content, status } = form.values;
    try {
      const body = { title, content, status, milestoneId};
      await fetch('/api/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch (error) {
      console.error(error);
    }
      setMessage('Sent');
      setSubmitted(true);
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
            <Radio.Group
              name="status"
              label="Select status"
              {...form.getInputProps('status', { type: 'radio' })}
            >
              <Radio value="TODO" label="TODO"   />
              <Radio value="DOING" label="DOING"  />
              <Radio value="DONE" label="DONE"  />
            </Radio.Group>
            </div>
            <div>
            <Button type="submit" disabled={message === 'Sending'}>Create Task</Button>
            </div>
          </div>
        </form>
        </Box>
        </div>
    )
}
