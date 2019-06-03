import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import { RegisterPage } from './components/Register';
import ForgetPassword from './components/forget-password';

export default () => (
    <Layout>
        <Route exact path='/Home' component={Home} />
        <Route exact path='/' component={Login} />
        <Route exact path='/Register' component={RegisterPage} />
        <Route exact path='/forget-password' component={ForgetPassword}/>
    </Layout>
);
