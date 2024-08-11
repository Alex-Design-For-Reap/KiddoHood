// import React from 'react';
import { Col, Row } from 'antd';
import Cards from '../components/Card';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';
import PleaseLogin from '../components/PleaseLogin';


const MyFavorites = () => {

  const userProfile = Auth.getProfile();
  const username = userProfile?.data?.username; // Safely accessing username

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <h1>{username} Favorite Events</h1>
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
        </>
      ) : (
        <>
          <PleaseLogin />
        </>
      )}
    </div>
  );
};

export default MyFavorites;
