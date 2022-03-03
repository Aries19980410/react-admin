import { Icon, Menu } from 'antd';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getMenu } from '../../api/menu';
//引入
import logo from '../../assets/images/logo.png';
import menuList from '../../config/menuConfig.jsx';
import './index.less';



const { SubMenu } = Menu;
/**
 * 左侧导航
 */
class LeftNav extends Component {

    getMenuList(){
        // let params = {

        // }
        getMenu().then(res=>{
            console.log(res)
        })
    }

    /**
     * 根据指定的menu数据去生成路由
     * @param {*} menuList 
     */
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.chlidren) {
                return (
                    <Menu.Item key={item.path}>
                        <Link to={item.path}>
                            <Icon type={item.icon}></Icon>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }
            return (
                <SubMenu key={item.path} title={
                    <span>
                        <Icon type={item.icon}></Icon>
                        <span>{item.title}</span>
                    </span>
                }
                >
                {
                    this.getMenuNodes(item.chlidren)
                }
                </SubMenu>
            )
        })
    }

    /**
     * 根据指定的menu数据去生成路由  reduce方法
     * @param {*} menuList 
     */


    getMenuNodes2 = (menuList) => {
        const path = this.props.location.pathname
        return menuList.reduce((pre,item)=>{
            if(!item.chlidren){
                pre.push(
                    <Menu.Item key={item.path}>
                        <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else{
                const cItem = item.chlidren.find(cItem=>cItem.path===path)
                if(cItem){
                    this.openKey = item.path
                }
                pre.push(
                    <SubMenu key={item.path} title={
                        <span>
                            {item.icon}
                            <span>{item.title}</span>
                        </span>
                    }
                    >
                    {
                        this.getMenuNodes2(item.chlidren)
                    }
                    </SubMenu>
                )
            }
            return pre
        },[])
    }

    //第一次runder后执行，执行一次，一般执行异步请求
    componentDidMount(){
        this.getMenuList()
    }


    render() {
        //获取当前路径
        const menuNodes = this.getMenuNodes2(menuList)
        const selectPath = this.props.location.pathname
        return (
            <div className="left-nav">
                <Link className="left-nav-link" to="">
                    <img src={logo} alt="" />
                    <h1>柠檬后台</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[selectPath]}
                    defaultOpenKeys={[this.openKey]}
                >
                    {
                        menuNodes
                    }
                </Menu>

            </div>
        );
    }
}


/*
 向外暴露使用高阶withRouter()包装非路由组件 ，
 新组件像leftNav传递三个参数：location、histroy 
*/
export default withRouter(LeftNav);