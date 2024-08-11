// import React from 'react';
import { Button, Col, Row } from 'antd';
// import Cards from '../components/Card';
import CardCreator from '../components/CardCreator';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';
import PleaseLogin from '../components/PleaseLogin';

const Dashboard = () => {

  const userProfile = Auth.getProfile();
  const username = userProfile?.data?.username; // Safely accessing username

  return (

    <div>
          {Auth.loggedIn() ? (
      <>
      <h1>{username} Dashboard</h1>
      <p>Manage your events</p>


      <Button type="primary" style={{ marginBottom: '20px' }}>
        <Link to="/CreateNew">Create New Event</Link>
      </Button>
      <Row gutter={16}>
        <Col span={8}>
          <CardCreator />
        </Col>
        <Col span={8}>
          <CardCreator />
        </Col>
        <Col span={8}>
          <CardCreator />
        </Col>
      </Row>
      </>
  ) : (
    <>
<PleaseLogin />
    </>
  )}

    </div>
  
);
};

export default Dashboard;
