import React from 'react';
import { Modal } from 'antd';
import InvoiceContent from './InvoiceContent';
import './ShowInvoiceModal.css';

const ShowInvoiceModal = ({ isOpen, onClose, data }) => {
    return (
        <Modal open={isOpen} onCancel={onClose} footer={null}>
            <InvoiceContent data={data} />
        </Modal>
    );
};

export default ShowInvoiceModal;
