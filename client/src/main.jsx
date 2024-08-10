
import '../src/App.css';

// import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import App from './App';
import Home from './pages/Home';
// import About from './pages/About';
// import Contact from './pages/Contact';
import Error from './pages/Error';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Dashboard from './pages/Dasboard';
import SinglePlace from './pages/SinglePlace';
import MyFavorites from './pages/MyFavorites';
import SeeAll from './pages/SeeAll';
import CreateNew from './pages/CreateNew';

const router = createBrowserRouter ([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'SeeAll',
        element: <SeeAll />
      },
      {
        path: 'Login',
        element: <Login />
      },
      {
        path: 'Register',
        element: <Register />
      },
      {
        path: 'Contact',
        element: <Contact/>
      },
      {
        path: 'Dashboard',
        element: <Dashboard />
      },
      {
        path: 'SnglePlace',
        element: <SinglePlace />
      },
      {
        path: 'MyFavorites',
        element: <MyFavorites />
      },
      {
        path: 'CreateNew',
        element: <CreateNew/>
      },
      {
        path: 'SinglePlace',
        element: <SinglePlace/>
      },
      
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
);