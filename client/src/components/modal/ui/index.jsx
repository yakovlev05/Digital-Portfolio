import React, {useState} from 'react';
import {Button, Modal} from 'antd';

const ModalComponent = ({stylesButton, message, title, handleSubmit}) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        handleSubmit();
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal} className={stylesButton}>
                Удалить аккаунт
            </Button>
            <Modal
                title={title}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                cancelText={'Отмена'}
                okText={'Да'}
            >
                <p>{message}</p>
            </Modal>
        </>
    );
};

export default ModalComponent;