import React, { useState } from "react";
import { Modal, Form, Input, Button, Menu, Dropdown, message, Avatar } from 'antd';
import 'antd/dist/antd.min.css';
import { SearchOutlined, UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import axios from "axios";
// import { GoogleLogin, GoogleLogout } from "react-google-login"

function NavbarMovie() {
    // const responseGoogle = response => {
    //     console.log(response);
    //     localStorage.setItem('accessToken', response.accessToken);
    //     // localStorage.setItem('isUserLogin', true)
    // }

    // const logoutGoogle = response => {
    //     console.log(response);
    //     localStorage.removeItem('accessToken');
    //     // localStorage.removeItem('isUserLogin');
    // }

    // const handleLogoutFailure = response => {
    //     console.log('Failed to log out', response)
    // }

    // SIGN OUT

    const handleSignOut = () => {
        localStorage.removeItem('isUserLogin')
        localStorage.removeItem('userInfo')
        window.location.href = '/'
    }

    const handleClickMenu = ({ key }) => {
        if (key === '2') {
            message.success("Sign Out successful !");
        }
      };
      
    const menu = (
        <Menu
          onClick={handleClickMenu}
          items={[
            {
              label: <a href="/edit-profile">Edit Profile</a>,
              key: '1',
            },
            {
              label: <a href="/" onClick={handleSignOut}>Sign Out</a>,
              key: '2',
            },
          ]}
        />
    );

    // MODAL SIGN IN
    const [isModalSignInVisible, setisModalSignInVisible] = useState(false);
    const showModalSignIn = () => { setisModalSignInVisible(true); };
    const handleSignInOk = () => { setisModalSignInVisible(false); };
    const handleSignInCancel = () => { setisModalSignInVisible(false); };
    const [formSignIn] = Form.useForm();
    const [inputSignIn, setInputSignIn] = useState({
        email: '',
        password: ''
    });
    const handleSignInInput = e => {
        setInputSignIn({
            ...inputSignIn,
            [e.target.id]: e.target.value
        });
    };
    const handleSignInSubmit = async (values) => {
        try {
            const res = await axios.post('https://notflixtv.herokuapp.com/api/v1/users/login', inputSignIn)
            console.log(res)
            const userInfo = {
                'id': res.data.data._id,
                'role': res.data.data.role,
                'email': res.data.data.email,
                'firstName': res.data.data.first_name,
                'lastName': res.data.data.last_name,
                'image': res.data.data.image,
                'token': res.data.data.token,
                'isConfirmed' : res.data.data.is_confirmed
            }
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            localStorage.setItem('isUserLogin', true)
            setInputSignIn({
                email: '',
                password: ''
            })
            formSignIn.resetFields()
            setisModalSignInVisible(false)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    };


    // MODAL SIGN UP
    const [isModalSignUpVisible, setisModalSignUpVisible] = useState(false);
    const handleSignUpOk = () => { setisModalSignUpVisible(false); };
    const handleSignUpCancel = () => { setisModalSignUpVisible(false); };
    const [formSignUp] = Form.useForm();
    const [inputSignUp, setInputSignUp] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const handleSignUpInput = e => {
        setInputSignUp({
            ...inputSignUp,
            [e.target.id]: e.target.value
        });
    };
    const handleSignUpSubmit = async (values) => {
        try {
            const res = await axios.post('https://notflixtv.herokuapp.com/api/v1/users', inputSignUp)
            console.log(res)
            const userInfo = {
                'id': res.data.data._id,
                'role': res.data.data.role,
                'email': res.data.data.email,
                'firstName': res.data.data.first_name,
                'lastName': res.data.data.last_name,
                'image': res.data.data.image,
                'token': res.data.data.token,
                'isConfirmed' : res.data.data.is_confirmed
            }
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            localStorage.setItem('isUserLogin', true)
            setInputSignUp({
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                password_confirmation: ''
            })
            formSignUp.resetFields()
            setisModalSignUpVisible(false)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    };

    const switchModalToSignIn = () => {
        setisModalSignUpVisible(false);
        setisModalSignInVisible(true);
    }

    const switchModalToSignUp = () => {
        setisModalSignInVisible(false);
        setisModalSignUpVisible(true);
    }

    return(
        <div className="bg-slate-900 h-20 flex flex-row justify-between items-center flex-wrap gap-x-5 sm:gap-x-10 md:gap-x-14 px-5 sm:px-10 md:px-14 py-0 sticky top-0 w-full z-50">
            <a className="flex flex-row items-center gap-5" href="/">
                <img src="/assets/images/logo-moviebase.svg" className="h-10 w-10" alt="Logo"/>
                <span className="font-bold text-2xl leading-6 text-white hover:text-white hidden md:block">MovieBase</span>
            </a>
            <div className="grow shrink">
                <form action="/" method="GET">
                    <Input
                        prefix={<SearchOutlined className="site-form-item-icon pr-1"/>}
                        name="searchMovie" 
                        className="h-9 px-3 py-2" 
                        placeholder="What do you want to watch?"
                    />
                </form>
            </div>
            <div className="flex flex-row items-center">
                { JSON.parse(localStorage.getItem('isUserLogin'))
                    ? (
                        <Dropdown overlay={menu}>
                            <a onClick={e => e.preventDefault()} href='/'>
                                <div className="flex items-center gap-3">
                                    <Avatar size={32} src={ JSON.parse(localStorage.getItem('userInfo')).image || 'https://via.placeholder.com/900?text=No+Image' } />
                                    <span className="text-white font-medium text-base hidden md:block">
                                        { JSON.parse(localStorage.getItem('userInfo')).firstName + ' ' + JSON.parse(localStorage.getItem('userInfo')).lastName }
                                    </span>
                                </div>
                            </a>
                        </Dropdown>
                    )
                    : (<button onClick={showModalSignIn} className="font-bold text-xs sm:text-sm md:text-base text-white">Sign In</button>)
                }
            </div>

            { /* MODAL SIGN IN */ }
            <Modal 
                key="SignInModal"
                title="Sign In" visible={isModalSignInVisible} 
                onOk={handleSignInOk} onCancel={handleSignInCancel}
                footer={[
                    <Button type="link" onClick={switchModalToSignUp}>Create an account</Button>,
                    <span>to leave a rating and review for free!</span>
                ]}
            >
                <Form 
                    layout='vertical' 
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    form={formSignIn} 
                    onFinish={handleSignInSubmit}
                >
                    <Form.Item 
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email !',
                            },
                            {
                                type: 'email',
                                message: 'Please input a valid email !',
                            },
                        ]}
                    >
                        <Input 
                            prefix={<MailOutlined className="site-form-item-icon pr-1"/>}
                            id="email" 
                            name="emailUser" 
                            placeholder="Input your email"
                            onChange={handleSignInInput}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Password"
                        name="password" 
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password !',
                            },
                        ]}>
                        <Input.Password 
                            prefix={<LockOutlined className="site-form-item-icon pr-1" />}
                            id="password" 
                            name="passwordUser" 
                            placeholder="Input your password"
                            onChange={handleSignInInput}
                        />
                    </Form.Item>
                    {/* <Form.Item>
                        <GoogleLogin
                            clientId="174253613502-25l1jtol4hrn9ib0u46qggguohjp6ha8.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        <GoogleLogout
                            clientId="174253613502-25l1jtol4hrn9ib0u46qggguohjp6ha8.apps.googleusercontent.com"
                            buttonText="Logout of Google"
                            onLogoutSuccess={logoutGoogle}
                            onFailure={handleLogoutFailure}
                        />
                    </Form.Item> */}
                    <Form.Item>
                        <Button block 
                            key="submit" 
                            type="primary" 
                            htmlType="submit"
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            
            { /* MODAL SIGN UP */ }
            <Modal 
                key="SignUpModal"
                title="Sign Up / Create New Account" visible={isModalSignUpVisible} 
                onOk={handleSignUpOk} onCancel={handleSignUpCancel}
                footer={[
                    <span>Already have an account?</span>,
                    <Button type="link" onClick={switchModalToSignIn}>Sign In here</Button>
                ]}
            >
                <Form layout='vertical' form={formSignUp} onFinish={handleSignUpSubmit}>
                    <Form.Item 
                        label="First Name"
                        name="first_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your firstname !',
                            },
                        ]}
                    >
                        <Input 
                            prefix={<UserOutlined className="site-form-item-icon pr-1"/>}
                            id="first_name" 
                            name="firstnameUser" 
                            placeholder="Input your firstname" 
                            onChange={handleSignUpInput}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Last Name"
                        name="last_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your lastname !',
                            },
                        ]}
                    >
                        <Input 
                            prefix={<UserOutlined className="site-form-item-icon pr-1"/>}
                            id="last_name" 
                            name="lastnameUser" 
                            placeholder="Input your lastname" 
                            onChange={handleSignUpInput}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email !',
                            },
                        ]}
                    >
                        <Input 
                            prefix={<MailOutlined className="site-form-item-icon pr-1"/>}
                            id="email" 
                            name="emailUser" 
                            placeholder="Input your email" 
                            onChange={handleSignUpInput}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Password"
                        name="password" 
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password !',
                            },
                        ]}>
                        <Input.Password 
                            prefix={<LockOutlined className="site-form-item-icon pr-1"/>}
                            id="password" 
                            name="passwordUser" 
                            placeholder="Input your password" 
                            onChange={handleSignUpInput}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Confirm Password"
                        name="password_confirmation" 
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password confirmation !',
                            },
                        ]}>
                        <Input.Password 
                            prefix={<LockOutlined className="site-form-item-icon pr-1"/>}
                            id="password_confirmation" 
                            name="passwordConfirmationUser" 
                            placeholder="Confirm your password" 
                            onChange={handleSignUpInput}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button block 
                            key="submit" 
                            type="primary" 
                            htmlType="submit"
                        >
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    )
}

export default NavbarMovie;