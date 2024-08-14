// Dashboard.jsx
import React from 'react';
import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import PleaseLogin from '../components/PleaseLogin';
import { QUERY_ME } from '../utils/queries';
import DashboardPage from '../components/CardCreator';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const me = data?.me || {};

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
      <h1>{me.username}'s Dashboard</h1>
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
                eventDate={event.eventDate}
                onDelete={
                  <Link to={`/event/${event._id}`}>
                    <Button type="primary" danger icon={<DeleteOutlined />}>
                      Delete
                    </Button>
                  </Link>
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
