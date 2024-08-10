// import React from 'react';
import { Button, Col, Row } from 'antd';
// import Cards from '../components/Card';
import CardCreator from '../components/CardCreator';

const Dashboard = () => {
  return (
    <div>
      <Button type="primary" style={{ marginBottom: '20px' }}>
        Create New Event
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
    </div>
  );
};

export default Dashboard;
