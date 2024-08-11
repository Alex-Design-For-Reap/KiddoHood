// import React, {useState} from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import Auth from './utils/auth';

import { UserOutlined, HomeOutlined, ContactsOutlined, MehOutlined  } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import myImage from './assets/KiddoHoodLogo.svg';


const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // const isLoggedIn = Auth.loggedIn();

  const items = [
    {
        label: <NavLink to='/'>Home</NavLink>,
        key: '1',
        icon: <HomeOutlined />,
    },
    {
        label: <NavLink to='/SeeAll'  > See All Events</NavLink>,
        key: '2',
        icon: <MehOutlined />,
    },
    {
        label: <NavLink to='/Contact'>Contact</NavLink>,
        key: '4',
        icon: <ContactsOutlined />,
    },
    {
      label: <NavLink to='/Login'>Login</NavLink>,
      key: '5',
      icon: <UserOutlined />,
    },
    {
      label: <NavLink to='/MyFavorites'> My Favorites</NavLink>,
      key: '3',
      icon: <MehOutlined />,
    },
    {
      label: <NavLink to='/Register'>Register</NavLink>,
      key: '6',
      icon: <UserOutlined />,
    },
    {
      label: <NavLink to='/SinglePlace'>Single Event</NavLink>,
      key: '7',
      icon: <UserOutlined />,
    },
    {
      label: <NavLink to='/Dashboard'>Dashboard</NavLink>,
      key: '8',
      icon: <UserOutlined />,
    },
    {
      label: <NavLink to='/CreateNew'>Create New</NavLink>,
      key: '9',
      icon: <UserOutlined />,
    },
    {
      label: <NavLink to='/Error'>Error</NavLink>,
      key: '11',
      icon: <UserOutlined />,
    },
  ];

  const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    // set up our client to execute the 'authLink' middleware prior to making the request to our GraphQL API
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
    
  return (
    <ApolloProvider client={client}>
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        >
        <div >
            <img src={myImage} alt="kiddoHood Logo" />
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '24px 16px 0',
          }}
          >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            >
            {/* {Auth.loggedIn() ? (
              <> */}
              <Outlet />
              {/* </>
            ) : (
              <>
              <h2>Please log in to continue</h2>
              </>
            )} */}
          </div>
        </Content>

        <Footer
          style={{
            textAlign: 'center',
          }}
          >
          KiddoHood ©{new Date().getFullYear()} Created by Alex Da Silva
        </Footer>
      </Layout>
    </Layout>
    </ApolloProvider>
  );
};

export default App;