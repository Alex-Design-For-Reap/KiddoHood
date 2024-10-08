import { Form, Input, DatePicker, Button, message } from 'antd';
import Auth from '../utils/auth';
import PleaseLogin from '../components/PleaseLogin';
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../utils/mutations';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


const CreateNew = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [createEvent, { error }] = useMutation(ADD_EVENT);

  const handleFormSubmit = async (values) => {
    try {
      // Get the logged-in user's ID from the token
      const userId = Auth.getProfile().data._id;

     // Convert the selected date to ISO string
     const eventDate = values.eventDate ? moment(values.eventDate).toISOString() : null;'';


      // Perform the mutation
      const { data } = await createEvent({
        variables: {
          title: values.title,
          eventDate: eventDate,
          location: values.location,
          description: values.description,
          imageUrl: values.imageUrl || '',
          userId: userId,
        },
        context: {
          headers: {
            authorization: `Bearer ${Auth.getToken()}`,
          },
        },
      });

      message.success('Event created successfully!', data);

      // Redirect to dashboard after event creation
      navigate('/dashboard');

      //reload the page to refresh data
      window.location.reload();

    } catch (err) {
      console.error('Error creating event:', err);
      message.error(`Failed to create event: ${err.message}`);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <h1>Create New Event</h1>
          <Form onFinish={handleFormSubmit} layout="vertical">
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
          style={{ width: '100%' }}
          format="DD-MM-YYYY HH:mm"
            showTime
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
      rules={[{ required: false, message: 'Please enter the image URL' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit">
        Create Event
      </Button>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            {error.message}
          </div>
        )}
    </Form.Item>
  </Form>        </>
        ) : (
          <PleaseLogin />
        )}
      </div>
  );
};

export default CreateNew;
