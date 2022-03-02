import { AppstoreOutlined, HomeOutlined, SettingFilled } from "@ant-design/icons";
const menuList = [{
        title: '首页',
        path: '/home',
        icon: <HomeOutlined/>
    },
    {
        title: '商品管理',
        path: '/products',
        icon: <AppstoreOutlined/>,
        chlidren: [{
            title: '商品列表',
            path: '/product',
            icon: '',
        }, {
            title: '分类管理',
            path: '/category',
            icon: '',
        }, ]
    },
    {
        title: '系统管理',
        path: '/system',
        icon: <SettingFilled/>,
        chlidren: [{
            title: '用户管理',
            path: '/user',
            icon: '',
        }, {
            title: '权限管理',
            path: '/role',
            icon: '',
        }, ]
    },
   
]

export default menuList;