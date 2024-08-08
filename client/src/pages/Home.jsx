import React from 'react';
import { Button, Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Welcome to KiddoHood</h1>
        <p>Your ultimate destination for kids' events and activities</p>
        <Button type="primary">
          <Link to="/login">Login</Link>
        </Button>
        <Button type="default" style={{ marginLeft: '10px' }}>
          <Link to="/register">Register</Link>
        </Button>
      </section>

      {/* Section 2 */}
      <section style={{ padding: '50px' }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Create Events">
              <p>Create and manage events easily.</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="See All Events">
              <p>View all the events in your area.</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Organize Your Favorites">
              <p>Save and organize your favorite events.</p>
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Home;
