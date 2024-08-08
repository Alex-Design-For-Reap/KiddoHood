import React from 'react';
import { Col, Row } from 'antd';
import Cards from '../components/Card';

const SeeAll = () => {
  return (
    <div>
      <h1>All Events</h1>
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

export default SeeAll;
