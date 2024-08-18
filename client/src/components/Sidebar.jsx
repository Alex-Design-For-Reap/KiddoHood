import {
    HomeOutlined,
    LogoutOutlined,
    UnorderedListOutlined,
    // HeartOutlined,
    PlusCircleOutlined,
    LoginOutlined,
    MailOutlined,
    ProfileOutlined
    } from '@ant-design/icons';

import { NavLink } from 'react-router-dom';
import myImage from '../assets/KiddoHoodLogo.svg';
import { Layout, Menu } from 'antd';
import Auth from '../utils/auth';

const {Sider} = Layout;

const Sidebar = () => {

    const handleLogout = (event) => {
        event.preventDefault();
        Auth.logout();
      };

    const isLoggedIn = Auth.loggedIn();

    const items = isLoggedIn
    ? 
    [
        {
            label: <NavLink to='/'>Home</NavLink>,
            key: '1',
            icon: <HomeOutlined />,
        },
        {
            label: <NavLink to='/SeeAll'  > See All Events</NavLink>,
            key: '2',
            icon: <UnorderedListOutlined />,
        },
        {
            label: <NavLink to='/Contact'>Contact</NavLink>,
            key: '4',
            icon: <MailOutlined />,
        },
        // This is ready to be used later as we evolve the application.
        // {
        //   label: <NavLink to='/MyFavorites'> My Favorites</NavLink>,
        //   key: '3',
        //   icon: <HeartOutlined />,
        // },
        {
          label: <NavLink to='/Dashboard'>Dashboard</NavLink>,
          key: '8',
          icon: <ProfileOutlined />,
        },
        {
          label: <NavLink to='/CreateNew'>Create New</NavLink>,
          key: '9',
          icon: <PlusCircleOutlined />,
        },
        {
            label: <span onClick={handleLogout}>Logout</span>,
            key: '5',
            icon: <LogoutOutlined />,
          },
  
    ] 
    : [
        {
            label: <NavLink to='/'>Home</NavLink>,
            key: '1',
            icon: <HomeOutlined />,
        },
        {
            label: <NavLink to='/SeeAll'  > See All Events</NavLink>,
            key: '2',
            icon: <UnorderedListOutlined />,
        },
        {
            label: <NavLink to='/Contact'>Contact</NavLink>,
            key: '4',
            icon: <MailOutlined />,
        },
        {
          label: <NavLink to='/Login'>Login</NavLink>,
          key: '5',
          icon: <LoginOutlined />,
        },
    ];


    return (
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

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}
            items={items}

             />
      </Sider>
    )
};

export default Sidebar;