import React from 'react';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import {Input, Space} from 'antd';

const ChangePasswordComponent = ({formState, setFormState}) => {
    return (
        <Space direction="vertical">
            <Input.Password placeholder="Текущий пароль"
                            onInput={(e) => setFormState({...formState, password: e.target.value})}
            />
            <Input.Password
                placeholder="Новый пароль"
                iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                onInput={(e) => setFormState({...formState, newPassword: e.target.value})}
            />
        </Space>
    );
};

export default ChangePasswordComponent;