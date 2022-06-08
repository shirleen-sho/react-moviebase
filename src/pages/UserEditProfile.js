import React, { useState } from 'react';
import { Form, Input, Button, message, Upload, Modal } from 'antd';
import 'antd/dist/antd.min.css';
import { UserOutlined, MailOutlined, PlusOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import axios from 'axios';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

function UserEditProfile() {
    const [formEditProfile] = Form.useForm();
    const [inputEditProfile, setInputEditProfile] = useState({
        first_name: JSON.parse(localStorage.getItem('userInfo')).firstName,
        last_name: JSON.parse(localStorage.getItem('userInfo')).lastName,
        email: JSON.parse(localStorage.getItem('userInfo')).email,
        image: JSON.parse(localStorage.getItem('userInfo')).image
    });
    const handleEditProfileInput = e => {
        setInputEditProfile({
            ...inputEditProfile,
            [e.target.id]: e.target.value
        });
    };
    const handleEditProfileSubmit = async (values) => {
        console.log(values)
        const token = JSON.parse(localStorage.getItem('userInfo')).token
        const allInput = { ...values, 'image': imageUpload }
        console.log(allInput)
        try {
            const res = await axios.put('https://notflixtv.herokuapp.com/api/v1/users', allInput, { headers: {"Authorization" : `Bearer ${token}`} })
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
            setInputEditProfile({
                first_name: '',
                last_name: '',
                email: '',
                image: null
            })
            formEditProfile.resetFields()
            message.success('Edit Profile SUCCESS !')
            window.location.reload()

        } catch (error) {
            console.log(error)
            message.error('Edit Profile ERROR !')
        }
    };

    const [imageUpload, setImageUpload] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'Profile',
            status: 'done',
            url: inputEditProfile.image,
        }
    ]);

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
            // const resFile = await getFileFromUrl(file.url, file.name);
            // file.preview = await getBase64(resFile);
        } 
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) => { 
        setFileList(newFileList);
        setImageUpload(newFileList[0].originFileObj);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{marginTop: 8}}>
                Upload
            </div>
        </div>
    );

    return(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: {duration: 0.2} }}
        >
            { !localStorage.getItem('isUserLogin') ? (
                <div className='p-16 flex justify-center items-center flex-row gap-10'>
                    <h1 className='font-bold text-3xl'>You're not Logged In yet.</h1>
                </div>
            ) : (
                    <div className='px-16 py-14 flex flex-col gap-5'>
                        <h1 className='font-bold text-3xl'>Edit Profile</h1>
                        <Form 
                            layout='vertical' 
                            initialValues={{
                                first_name: inputEditProfile.first_name,
                                last_name: inputEditProfile.last_name,
                                email: inputEditProfile.email,
                            }}
                            form={formEditProfile} 
                            onFinish={handleEditProfileSubmit}
                        >
                            <div className='flex flex-col sm:flex-row gap-0 sm:gap-16'>
                                <div className='basis-full sm:basis-1/2'>
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
                                            onChange={handleEditProfileInput}
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
                                            onChange={handleEditProfileInput}
                                        />
                                    </Form.Item>
                                </div>
                                <div className='basis-full sm:basis-1/2'>
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
                                            onChange={handleEditProfileInput}
                                        />
                                    </Form.Item>
                                    <Form.Item 
                                        label="Image"
                                        name="image"
                                    >
                                        <Upload
                                            id='image'
                                            listType="picture-card"
                                            fileList={fileList}
                                            onPreview={handlePreview}
                                            onChange={handleChange}
                                            beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
                                        >
                                            {fileList.length >= 1 ? null : uploadButton}
                                        </Upload>
                                        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                                            <img alt="example" style={{ width: '100%' }} src={previewImage}/>
                                        </Modal>
                                    </Form.Item>
                                </div>
                            </div>
                                <Form.Item className='w-full'>
                                    <Button
                                        key="submit" 
                                        type="primary" 
                                        htmlType="submit"
                                        className='w-full sm:w-1/4'
                                    >
                                        Confirm Edit Profile
                                    </Button>
                                </Form.Item>
                        </Form>
                    </div>
            )}
        </motion.div>
    )
}

export default UserEditProfile;