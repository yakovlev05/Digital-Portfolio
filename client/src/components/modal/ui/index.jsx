import React, {useState} from 'react';
import {Button, Modal} from 'antd';

const ModalComponent = ({
                            stylesButton,
                            message,
                            title,
                            handleSubmit,
                            AnotherContent = null,
                            okButtonText = 'Да',
                            cancelButtonText = 'Отмена',
                            titleButton,
                            timeout = 2000
                        }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        handleSubmit();
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, timeout);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal} className={stylesButton}>
                {titleButton}
            </Button>
            <Modal
                title={title}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                cancelText={cancelButtonText}
                okText={okButtonText}
            >
                <p>{message}</p>
                {AnotherContent}
            </Modal>
        </>
    );
};

export default ModalComponent;