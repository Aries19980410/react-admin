import { DeleteOutlined, EditOutlined, TagsOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Form, Input, Modal, Popconfirm, Select, Space, Switch, Table, Tree } from 'antd';
import React, { useEffect, useState } from 'react';
import { getJobsList, getRoleList, getUserDept, getUserPage } from '../../api/system';
import './user.less';

const { TreeNode } = Tree
const { RangePicker } = DatePicker
const { Option } = Select;
function User(props) {
    const [listData, setList] = useState()
    const [deptList, setDept] = useState()
    const [roleList, setRole] = useState()
    const [jobList, setJob] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [form] = Form.useForm()
   
    useEffect(() => {
        getListData()       // 获取表格数据
        getDeptList()       // 获取部门数据
        getRole()           // 获取角色列表
        getJobList()        // 获取岗位列表
    }, []);

    // 表单重制
    const onReset = () => {
        form.resetFields();
    };
    
    // 自定义树形
    const getTreeNode = (deptList) => {
        if (deptList && deptList.length > 0) {
            return deptList.map(item => {
                if (item.children) {
                    return (
                        <TreeNode key={item.id} title={item.name}>
                            {getTreeNode(item.children)}
                        </TreeNode>
                    )

                }
                return (
                    <TreeNode key={item.id} title={item.name}></TreeNode>
                )
            })
        }
        return []
    }

    const selectDept = (selectedKeys, e) => {
        console.log(selectedKeys, e)
    }

    //获取部门数据
    const getDeptList = () => {
        getUserDept().then(res => {
            const deptList = res.data.content
            setDept(deptList)
        })
    }

    //获取表格数据
    const getListData = () => {
        let params = {
            page: 0,
            size: 10
        }
        getUserPage(params).then(res => {
            const listData = res.data.content
            setList(listData)
        })
    }
    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            width: 'auto',
            align: "center",
        },
        {
            title: '昵称',
            dataIndex: 'nickName',
            width: 'auto',
            align: "center",
        },
        {
            title: '性别',
            dataIndex: 'gender',
            width: 'auto',
            align: "center",
        },
        {
            title: '电话',
            dataIndex: 'phone',
            width: 'auto',
            align: "center",
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            width: 'auto',
            align: "center",
        },
        {
            title: '部门',
            dataIndex: 'dept',
            width: 'auto',
            align: "center",
            render: (text, record, index) => {
                return <span>{record.dept.name}</span>
            }
        },
        {
            title: '状态',
            dataIndex: 'enabled',
            width: 'auto',
            align: "center",
            render: (text, record, rowIndex) => {
                return <Switch disabled defaultChecked={record.enabled}></Switch>
            }
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'x',
            width: 'auto',
            align: "center",
            render: (text, record, index) =>
                <Space size="middle">
                    {/* <Link to={{ pathname: '/home/detail', search: `?goodId=${record.id}` }}>
                        <Button size='small' icon={<SearchOutlined />} type="primary">查看</Button>
                    </Link> */}
                    <Button style={{ width: '60px' }} size='middle' type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}></Button>

                    <Popconfirm
                        title="你确定要删除这个用户? "
                        onConfirm={() => handleDelete(record, index)}
                        onCancel={cancelRemove}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button style={{ width: '60px' }} danger size='middle' icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                </Space>
        },
    ];

    // 编辑
    const handleEdit = (val) => {
        setIsModalVisible(true)
        form.setFieldsValue({
            username:val.username,
            phone:val.phone,
            nickName:val.nickName,
            email:val.email,
            role:val.roles[0].id,
            job:val.jobs[0].id
        })
    }

    // 新增
    const handelAdd = () => {
        onReset()
        setIsModalVisible(true)
    }

    // 单个删除
    const handleDelete = (val, index) => {
        listData.splice(index, 1)
        setList([...listData])
    }

    // 取消删除
    const cancelRemove = (e) => {}

    // 取消弹窗
    const cancel= (e) => {
        setIsModalVisible(false)
    }

    // 选中
    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys)
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }
    const hasSelected = selectedRowKeys.length > 0;

    // 选择部门
    const handleChangeRole = (values) => {
        // console.log(values)
    }

    // 获取role列表
    const getRole = () => {
        getRoleList().then(res => {
            const roleList = res.data
            setRole(roleList)
        })
    }

    // 循环角色列表
    const roleSelect = (roleList) => {
        if (roleList && roleList.length) {
            return roleList.map(item => {
                return (
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                )
            })
        }
        return []
    }

    // 获取岗位列表
    const getJobList = () => {
        getJobsList().then(res => {
            const jobList = res.data.content
            setJob(jobList)
        })
    }

    // 循环岗位
    const getJob = (jobList) => {
        if (jobList && jobList.length) {
            return jobList.map(item => {
                return (
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                )
            })
        }
        return []
    }

    // 选择岗位
    const handleChangeJob = (values) => {
        // console.log(values)
    }

    // 保存
    const save = (values) => {
        console.log('Success:', values);
        setIsModalVisible(false)
        
    };

    // 批量删除
    const handleRemove=()=>{
        console.log(selectedRowKeys)
    };

    return (
        <div className="container">
            <Modal title='新增' visible={isModalVisible} width='50%' onCancel={cancel} footer={null}>
                <Form
                    id="userForm"
                    name="form"
                    labelCol={{ span: 4, }}
                    wrapperCol={{ span: 20, }}
                    initialValues={{ remember: true, }}
                    onFinish={save}
                    form={form}
                >
                    <Form.Item
                        label="名称"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="手机号"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="昵称" name="nickName" rules={[{ required: true, message: '请输入昵称', },]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入邮箱', },]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="角色" name="role">
                        <Select style={{ width: 120 }} allowClear placeholder="请选择角色" onChange={handleChangeRole}>
                            {roleSelect(roleList)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="岗位" name="job">
                        <Select style={{ width: 120 }} allowClear placeholder="请选择岗位"  onChange={handleChangeJob}>
                            {getJob(jobList)}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"  htmlType="submit"> 确定 </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Card>
                <div className="content-body">
                    <div className="left">
                        <Tree showLine blockNode onSelect={selectDept} switcherIcon={<TagsOutlined />}	>
                            {getTreeNode(deptList)}
                        </Tree>
                    </div>
                    <div className="right">
                        <div className="batchOperation">
                            <div className="searchParams">
                                <Input style={{ width: ' 220px' }} placeholder="请输入用户名"></Input>
                                <RangePicker bordered={false} placeholder={['开始日期', '结束日期']} />
                            </div>
                            <div className="table-left">
                                <Button type="danger" disabled={!hasSelected} onClick={()=>handleRemove()}>删除</Button>
                                <Button type="primary" onClick={() => handelAdd()}>新增</Button>
                            </div>
                        </div>
                        <Table
                            rowKey="id"
                            rowSelection={rowSelection}
                            bordered
                            dataSource={listData}
                            columns={columns}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );

}

export default User;