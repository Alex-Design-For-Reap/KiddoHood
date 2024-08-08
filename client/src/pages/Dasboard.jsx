import React from 'react';
import { Button, Col, Row } from 'antd';
import Cards from '../components/Card';

const Dashboard = () => {
  return (
    <div>
      <Button type="primary" style={{ marginBottom: '20px' }}>
        Create New Event
      </Button>
      <Row gutter={16}>
        <Col span={8}>
          <Cards />
        </Col>
        <Col span={8}>
          <Cards />
        </Col>
        <Col span={8}>
          <Cards />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
