import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import '../../HistoryDetail/ShowInvoiceModal/ShowInvoiceModal.css';

const PrescriptionTable = ({ data }) => {
    const [medicines, setMedicines] = useState([]);
    useEffect(() => {
        if (data) {
            setMedicines(data || []);
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
            title: 'Liều dùng',
            dataIndex: 'dosage',
            key: 'dosage',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
    ];


    return (
        <div>
            <h3 className='title-modal-prescription mb-3'>Thông tin đơn thuốc</h3>
            <div className='invoice-section'>
                <h4 className='table-title'><box-icon name='plus-medical'></box-icon> Bảng Thuốc </h4>
                <Table
                    columns={columnsMedicines}
                    dataSource={medicines.map((item, index) => ({ ...item, key: index }))}
                    pagination={false}
                />
            </div>
        </div>
    );
};

export default PrescriptionTable;
