import { useState } from "react";
import { useForm } from '@mantine/form';
import { TextInput, Checkbox, Button, Textarea, Group, Box } from '@mantine/core';

type Props = {
    goalId: string;
    handleSent: Function;
}
export default function MilestoneForm ({ goalId }: Props) {
    const [message, setMessage] = useState(''); // This will be used to show a message if the submission is successful
    const [submitted, setSubmitted] = useState(false);

    const form = useForm({
      initialValues: {
        title: '',
        content: '',
        completed: false
      },
  
      validate: {
        title: (value) => (/[\w]{3,}/.test(value) ? null : 'Title required'),
        content: (value) => (/[\w]{3,}/.test(value) ? null : 'Content required'),
      },
    });

    const handleSubmit =  async () => {
      setMessage('Sending');
      console.log("Form submitted: ", )
    try {
      const body = { ...form.values, goalId};
      await fetch('/api/milestone', {
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