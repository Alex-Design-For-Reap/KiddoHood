import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Form, Input, DatePicker, Button, message } from 'antd';
import Auth from '../utils/auth';
import PleaseLogin from '../components/PleaseLogin';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_EVENT } from '../utils/mutations';
import { QUERY_SINGLE_EVENT } from '../utils/queries';
import moment from 'moment';

const EditEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { loading, data } = useQuery(QUERY_SINGLE_EVENT, {
    variables: { eventId: eventId },
  });

  const [updateEvent] = useMutation(UPDATE_EVENT, {
    onCompleted: () => {
      message.success('Event updated successfully!');
      navigate('/dashboard');
    },
    onError: (err) => {
      console.error('Failed to update event:', err.message);
    },
  });

  const event = data?.event || {};

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: event.title,
        location: event.location,
        eventDate: event.eventDate ? moment(event.eventDate): null,
        description: event.description,
        imageUrl: event.imageUrl,
      });
    }
  }, [data, form, event]);

  const handleFormSubmit = async (values) => {
    try {
      await updateEvent({
        variables: {
          updateEventId: eventId,
          title: values.title,
          location: values.location,
          eventDate: values.eventDate ? values.eventDate.toISOString() : null,  // Convert to ISO format
          description: values.description,
          imageUrl: values.imageUrl,
        },
      });
    } catch (err) {
      console.error('Error updating event:', err);
      message.error(`Failed to update event: ${err.message}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Auth.loggedIn()) {
    return <PleaseLogin />;
  }

  return (
    <div>
      <h1>Edit Event</h1>
      <Form
        form={form}
        onFinish={handleFormSubmit}
        layout="vertical"
      >
        <Form.Item
          name="title"
          label="Event Title"
          rules={[{ required: true, message: 'Please enter the event title' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="eventDate"
          label="Event Date"
          rules={[{ required: true, message: 'Please enter the event date' }]}
        >
          <DatePicker 
            showTime 
            format="DD/MM/YYYY HH:mm"  // Match the format with backend or desired display
            style={{ width: '100%' }} 
          />
        </Form.Item>

        <Form.Item
          name="location"
          label="Address"
          rules={[{ required: true, message: 'Please enter the event address' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Event Description"
          rules={[{ required: true, message: 'Please enter the event description' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="imageUrl"
          label="Add image URL"
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Event
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditEvent;
