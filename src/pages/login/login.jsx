import { Button, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { getCodeImg, login } from "../../api/login";
import { getUUID } from '../../utils/index';
import './login.less';
function Login(props) {
    const [codeImg, setCodeImg] = useState();
    const [uuid, setUuid] = useState();
    //初始化
    useEffect(() => {
        getCode()
    }, []);
    // 登录
    const onFinish = (from) => {
        from.uuid = uuid
        // from.password = encrypt(from.password)
        login(from).then(res => {
            console.log(res)
            if (res.data.code === 0) {
                const token = res.data.token
                localStorage.setItem('token', token)
                message.success('登录成功！')
                props.history.push('/');
            }else{
                message.warning(res.data.msg)
            }
        })

    };
    //登录失败
    const fail = (err) => {
        message.error('登录失败，请检查表单');
    };
    //获取验证码
    const getCode = () => {
        let uuid = getUUID()
        getCodeImg(uuid).then(res => {
            const codeImg = "data:image/png;base64," + btoa(new Uint8Array(res.data).reduce((data,byte)=>
                data + String.fromCharCode(byte),""
            ))
            setCodeImg(codeImg)
            setUuid(uuid)
        })
    }

    return (
        <div className="login">
            <div className="login-header">

            </div>
            <div className="login-content">
                <Form
                    name="loginForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={fail}
                >
                    <div className='title'>
                        <span>柠檬后台管理系统</span>
                    </div>
                    <Form.Item
                        label="账号"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入账号',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <div className="code">
                        <Form.Item
                            style={{ margin: 0 }}
                            label="验证码"
                            name="captcha"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证码',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <img src={codeImg} alt="" onClick={() => getCode()} />
                    </div>

                    <div className='btnBox'>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                        <Button type="" htmlType="submit">
                            注册
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );

}

export default Login;