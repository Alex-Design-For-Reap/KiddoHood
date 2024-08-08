// src/components/CardRow.jsx
import React from 'react';
import { Row, Col } from 'antd';
import Cards from '../components/Card';

const CardRow = () => (
  <Row gutter={[16, 16]} justify="center">
    <Col gutter={[16,16]} xs={24} sm={12} md={8} lg={8} xl={6}>
      <Cards />
    </Col>
    <Col xs={24} sm={12} md={8} lg={8} xl={6}>
      <Cards />
    </Col>
    <Col xs={24} sm={12} md={8} lg={8} xl={6}>
      <Cards />
    </Col>
  </Row>
);

export default CardRow;
