// import React from 'react';
import { Col, Row } from 'antd';
import Cards from '../components/Card';

const MyFavorites = () => {
  return (
    <div>
      <h1>My Favorite Events</h1>
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

export default MyFavorites;
