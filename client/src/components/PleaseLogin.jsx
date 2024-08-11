// src/components/PleaseLogin.jsx

// import React from 'react';
import { Button } from 'antd';
// import Auth from '../utils/auth';

const PleaseLogin = () => {
    return (
        <div>
        <h2>Please log in to continue</h2>
        <Button type="primary" href="/Login">
            Login
        </Button>
        </div>
    );
    };

export default PleaseLogin;