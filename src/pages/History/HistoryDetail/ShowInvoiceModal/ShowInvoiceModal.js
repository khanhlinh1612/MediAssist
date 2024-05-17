import React, { useState, useEffect } from 'react';
import { Modal, Table, Tag} from 'antd';
import './ShowInvoiceModal.css';

export default function ShowInvoiceModal({ isOpen, onClose, data }) {
    const [medicines, setMedicines] = useState([]);
    const [medicalServices, setMedicalServices] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (data) {
            const { medicines, medicalServices, total } = data;
            setMedicines(medicines || []);
            setMedicalServices(medicalServices || []);
            setTotal(total || 0);
        }
    }, [data]);

    const columnsMedicines = [
        {
            title: 'STT',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tên thuốc',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giá thuốc',
            dataIndex: 'price',
            key: 'price',
            render: (price) => divideNumber(price),
        },
        {
            title: 'Thành tiền',
            key: 'totalPrice',
            render: (_, record) => divideNumber(record.quantity * record.price),
        },
    ];

    const columnsMedicalServices = [
        {
            title: 'STT',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá dịch vụ',
            dataIndex: 'price',
            key: 'price',
            render: (price) => divideNumber(price),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Thành tiền',
            key: 'totalPrice',
            render: (_, record) => divideNumber(record.quantity * record.price),
        },
    ];

    const divideNumber = (money) => {
        let strMoney = money.toString();
        let parts = strMoney.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    function translateStatus(status) {
        if (status) {
            switch (status.toLowerCase()) {
                case 'unpaid':
                    return <Tag color="red">chưa thanh toán</Tag>;
                case 'paid':
                    return <Tag color="green">đã thanh toán</Tag>;
                case 'in progress':
                    return <Tag color="cyan">đang xử lý</Tag>;
                case 'refunded':
                    return <Tag color="geekblue">hoàn trả</Tag>;
                case 'cancelled':
                    return <Tag color="purple">hủy bỏ</Tag>;
                default:
                    return <Tag color="gray">không xác định</Tag>;
            }
        } else {
            return <Tag color="gray">không xác định</Tag>;
        }
    }
    return (
        <Modal open={isOpen} onCancel={onClose} footer={null}>
            <h3 className='title-modal-prescription mb-5'>Thông tin hóa đơn</h3>
            <h5 className='table-title mb-4'>Tình trạng: <span className='status-invoice'>{translateStatus(data.status)}</span></h5>
            {medicines.length > 0 && (
                <div className='invoice-section'>
                    <h4 className='table-title'><box-icon name='plus-medical'></box-icon> Bảng Thuốc</h4>
                    <Table
                        columns={columnsMedicines}
                        dataSource={medicines.map((item, index) => ({ ...item, key: index }))}
                        pagination={false}
                    />
                </div>
            )}

            {medicalServices.length > 0 && (
                <div className='invoice-section'>
                    <h5 className='table-title'><box-icon name='injection' color="#666666"></box-icon> Bảng dịch vụ</h5>
                    <Table
                        columns={columnsMedicalServices}
                        dataSource={medicalServices.map((item, index) => ({ ...item, key: index }))}
                        pagination={false}
                    />
                </div>
            )}

            <div className='total-section mt-5'>
                <h4 className='total-modal-prescription'>Tổng cộng: <span className="total-amount">{divideNumber(total)} </span>VND</h4>
            </div>
        </Modal>
    );
}
