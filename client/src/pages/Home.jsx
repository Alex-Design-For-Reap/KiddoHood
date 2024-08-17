import React from 'react';
import { Button, Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Home = () => {
  // const loggedIn = Auth.loggedIn();
  const userProfile = Auth.getProfile();
  const username = userProfile?.data?.username; // Safely accessing username

  return (
    <div>
      {/* Hero Section */}{}
      <section 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '5% 10%',
        }}
        >

        {Auth.loggedIn()? (
          <>
          <h1>Welcome back, {username}!</h1>
          <p>Your ultimate destination for kids events and activities</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button type="primary">
              <Link to="/Dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </>
        ) : (
          <>
            <h1>Welcome to KiddoHood</h1>
            <p>Your ultimate destination for kids events and activities</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button type="primary">
                <Link to="/login">Login</Link>
              </Button>
              <Button type="default">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </>
        )}
      </section>

      {/* Section 2 */}
      <section style={{ padding: '5%' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={8}>
            <Card title="Create Events">
              <p>Create and manage events easily.</p>
              <Button shape="round">
                <Link to="/CreateNew">Create</Link>
              </Button>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card title="See All Events">
              <p>View all the events in your area.</p>
              <Button shape="round">
                <Link to="/SeeAll">See All</Link>
              </Button>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card title="Organize Your Favorites">
              <p>Save and organize your favorite events.</p>
              <Button shape="round">
                <Link to="/MyFavorites">My Favorites</Link>
              </Button>
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Home;
