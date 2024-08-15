import React from 'react';
import { Button, Col, Row, Modal, message } from 'antd'; // Import Modal here
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import PleaseLogin from '../components/PleaseLogin';
import { QUERY_ME } from '../utils/queries';
import { DELETE_EVENT } from '../utils/mutations';
import DashboardPage from '../components/CardCreator';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import DeleteAccount from '../components/DeleteUser';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const me = data?.me || {};
  const navigate = useNavigate();

  const [deleteEvent] = useMutation(DELETE_EVENT, {
    onCompleted: () => {
      message.success('Event deleted successfully!');
      refetch(); // Refetch the QUERY_ME query after deletion to refresh the page
      navigate('/dashboard');
    },
    onError: (err) => {
      console.error("Failed to delete event:", err.message);
    }
  });

  // Handle delete event with confirmation
  const handleDelete = (eventId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this event?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteEvent({
            variables: { deleteEventId: eventId },
          });
        } catch (err) {
          console.error('Error deleting event:', err.message);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // Check if the user is logged in
  if (!Auth.loggedIn()) {
    return <PleaseLogin />;
  }

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{me.username} Dashboard</h1>
      <p>Manage your events</p>
      <Button type="primary" style={{ margin: '20px' }}>
        <Link to="/CreateNew">Create New Event</Link>
      </Button>

      <DeleteAccount/>


      <Row gutter={16}>
        {me.events.length ? (
          me.events.map(event => (
            <Col span={8} key={event._id}>
              <DashboardPage 
                title={event.title}
                description={event.description}
                imageUrl={event.imageUrl}
                likesCount={event.likesCount}
                onDelete={
                  <Button type="primary" danger icon={<DeleteOutlined />}
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </Button>
                }
                onEdit={
                  <Link to={`/edit/${event._id}`}>
                    <Button type="primary" icon={<EditOutlined />}>
                      Edit
                    </Button>
                  </Link>
                }
              />
            </Col>
          ))
        ) : (
          <div>No events found.</div>
        )}
      </Row>
    </div>
  );
};

export default Dashboard;
