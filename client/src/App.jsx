// import React, {useState} from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';


const { Header, Content, Footer } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


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
      <Sidebar />
      <Layout>
        <Content
            style={{
              margin: '24px 16px 0',
              padding: 24,
              minHeight: 'calc(100vh - 134px)', // Adjusting height for responsive design
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              display: 'flex',
              flexDirection: 'column',
            }}
        > 
            <Outlet />
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