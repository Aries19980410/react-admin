import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Table } from 'antd';
import React, { Component } from 'react';
import './category.less';
class Category extends Component {

    remove=(row)=>{
        console.log('remove',row)
    }
    

    render() {

        const columns = [
            {
              title: '名字',
              align:'center',
              dataIndex: 'name'
            },
            {
              title: '金额',
              align:'center',
              className: 'column-money',
              dataIndex: 'money',
            },
            {
              title: '地址',
              align:'center',
              dataIndex: 'address',
            },
            {
                title: '操作',
                align:'center',
                render:(_,row,rowIndex)=>(
                    <Button onClick={()=>this.remove(row)}>删除</Button>
                )
              },
        ];      
        
        const data = [
            {
              key: '1',
              name: 'John Brown',
              money: '￥300,000.00',
              address: 'New York No. 1 Lake Park',
            },
            {
              key: '2',
              name: 'Jim Green',
              money: '￥1,256,000.00',
              address: 'London No. 1 Lake Park',
            },
            {
              key: '3',
              name: 'Joe Black',
              money: '￥120,000.00',
              address: 'Sidney No. 1 Lake Park',
            },
        ];
          

        const extra = (
            <Button type='primary'>
                <PlusOutlined />
                <span>添加</span>
            </Button>
        )

        return (
            <Card extra={extra}>
                <Table 
                    columns={columns}
                    dataSource={data}
                    pagination={{defaultPageSize:2 , showQuickJumper:true}}
                    bordered
                />
            </Card>
        );
    }
}

export default Category;