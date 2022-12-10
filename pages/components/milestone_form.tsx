import { useState } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { MilestoneProps } from "../../prisma/types"
import { Button } from '@mantine/core';
type Props = {
    goalId: string;
}
export default function MilestoneForm ({ goalId }: Props) {
    const [message, setMessage] = useState(''); // This will be used to show a message if the submission is successful
    const [submitted, setSubmitted] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('')
    const formik = useFormik({
        initialValues: {
          title: '',
          content: '', 
        },
        onSubmit: async (values) => {
          setMessage('Form submitted');
          console.log("Form submitted: ", values)
        try {
          const body = {...values, goalId};
          await fetch('/api/milestone', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
        } catch (error) {
          console.error(error);
        }
          setSubmitted(true);
        },
        validationSchema: yup.object({
          title: yup.string().trim().required('Name is required'),
          content: yup.string().trim().required('Description is required'),
        }),
      });

    return (
        <div>

<form className="w-50" onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <div>
              <label htmlFor="title" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Add title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.title && (
                <div className="text-danger">{formik.errors.title}</div>
              )}
            <div>
              <label htmlFor="content" className="form-label">
                Description
              </label>
              <textarea
                name="content"
                className="form-control"
                placeholder="Add content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.errors.content && (
                <div className="text-danger">{formik.errors.content}</div>
              )}
            </div>
            <div>
            <Button type="submit">Create Milestone</Button>
            </div>
          </div>
        </form>
        </div>
    )
}
