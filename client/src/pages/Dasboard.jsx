// Dashboard.jsx
// import React from 'react';
import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import PleaseLogin from '../components/PleaseLogin';
import { QUERY_ME } from '../utils/queries';
import { DELETE_EVENT } from '../utils/mutations';
import DashboardPage from '../components/CardCreator';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const me = data?.me || {};

  const [deleteEvent] = useMutation(DELETE_EVENT, {
    onCompleted: () => {
      refetch(); // Refetch the QUERY_ME query after deletion to refresh the page
    },
    onError: (err) => {
      console.error("Failed to delete event:", err.message);
    }
  });

  // Handle delete event
  const handleDelete = async (eventId) => {
    try {
      await deleteEvent({
        variables: { deleteEventId: eventId },
      });
    } catch (err) {
      console.error('error deleting event:', err.message);
    }
  };
  
  // Check if the user is logged in
  if (!Auth.loggedIn()) {
    return <PleaseLogin />;
  }

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // const handleEdit = (eventId) => {
  //   console.log('Edit event:', eventId);
  // }

  return (
    <div>
      <h1>{me.username} Dashboard</h1>
      <p>Manage your events</p>
      <Button type="primary" style={{ marginBottom: '20px' }}>
        <Link to="/CreateNew">Create New Event</Link>
      </Button>

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
              <Link to={`/event/${event._id}`}>
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
