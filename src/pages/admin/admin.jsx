import { Layout } from 'antd';
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Header from '../../components/header';
import LeftNav from '../../components/left-nav';
import Category from "../category/category";
import Home from "../home/home";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
const { Footer, Sider, Content } = Layout;

class Admin extends Component {
    // if (!user) {
    //    return <Redirect to="/login" /> 
    // }
    render() {
        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header/>
                    <Content style={{background:'#fff', margin:'10px',padding:'10px'}}>
                        <Switch>
                            <Route path="/home" component={Home} />
                            <Route path="/user" component={User} />
                            <Route path="/role" component={Role} />
                            <Route path="/category" component={Category} />
                            <Route path="/product" component={Product} />
                            <Redirect to="/home"></Redirect>
                        </Switch>
                    </Content>
                    <Footer style={{background:'#ccc'}}>舒服</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Admin;