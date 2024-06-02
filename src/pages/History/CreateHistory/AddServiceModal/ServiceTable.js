import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { Table, Popconfirm } from 'antd';
import '../../HistoryDetail/ShowInvoiceModal/ShowInvoiceModal.css';

const ServiceTable  = ({ data }) => {
    const [medicalServices, setMedicalServices] = useState([]);
    useEffect(() => {
        if (data) {
            setMedicalServices(data || []);
        }
    }, [data]);

    const columnsMedicalServices = [
        {
            title: 'STT',
            key: 'index',
            align: "center",
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'name',
            align: "center",
            key: 'name',
        },
        {
            title: 'Kết quả xét nghiệm',
            dataIndex: 'name',
            align: "center",
            key: 'name',
        },
        {
            title: 'Kết quả hình ảnh',
            dataIndex: 'name',
            align: "center",
            key: 'name',
        },
        {
            title: 'Kết luận',
            dataIndex: 'quantity',
            align: "center",
            key: 'quantity',
        },
        {
            title: 'Action',
            align: "center",
            key: 'action',
            render: (patient, record) => {
                return (<div className="action-icon mt-2">
                    <Link to={`/patients/${patient._id}`} className="me-2">
                        <box-icon name="edit" color="#624DE3"></box-icon>
                    </Link>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa?"
                        // onConfirm={() => handleDelete(patient._id)}
                        okText="Xác nhận"
                        cancelText="Hủy"
                        className="me-2"
                    >
                        <Link>
                            <box-icon name="trash" color="#A30D11"></box-icon>
                        </Link>
                    </Popconfirm>
                </div>);
            }
        }
    ];


    return (
        <div>
            <h3 className='title-modal-prescription mb-3'>Thông tin dịch vụ</h3>
                <div className='invoice-section'>
                    <h5 className='table-title'><box-icon name='injection' color="#666666"></box-icon> Bảng dịch vụ</h5>
                    <Table
                        columns={columnsMedicalServices}
                        dataSource={medicalServices.map((item, index) => ({ ...item, key: index }))}
                        pagination={false}
                    />
                </div>
        </div>
    );
};

export default ServiceTable;
