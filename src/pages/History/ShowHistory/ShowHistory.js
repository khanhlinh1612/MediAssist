import React, { useEffect, useState } from 'react';
import Sidebar from "../../../components/Sidebar";
import { Link, useLocation } from 'react-router-dom';
import './ShowHistory.css';
import axios from 'axios';
import { format } from 'date-fns';
import { Tag, Table, Space, Input, message, Popconfirm, Avatar} from 'antd';
import ShowInvoiceModal from '../HistoryDetail/ShowInvoiceModal/ShowInvoiceModal';

const ShowHistory = () => {
    const { Column } = Table;
    const { Search } = Input
    const [histories, setHistories] = useState([]);
    const [originalHistories, setOriginalHistories] = useState([]);
    const [sortedInfo, setSortedInfo] = useState({});
    const location = useLocation();
    const [modalInvoiceOpen, setModalInvoiceOpen] = useState(false);
    const [invoiceData, setInvoiceData] = useState({});
    const closeInvoiceModal = () => {
        setModalInvoiceOpen(false);
    };
    const getRandomColor = (str) => {
        const colors = ['#fde3cf', '#f56a00', '#d4380d', '#ffbb96', '#ff7a45', '#722ed1', '#9254de', '#1890ff', '#096dd9', '#0050b3', '#13c2c2', '#36cfc9'];
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % colors.length;
        return colors[index];
    };
    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };
    const handleShowInvoice = (invoice) => {
        setModalInvoiceOpen(true);
        const { medicalServices, medicines, total, status } = invoice;
        setInvoiceData({ medicalServices, medicines, total, status });
    }
    // Mảng chứa tất cả màu sắc từ Ant Design
    const tagColors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];

    const hashColor = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % tagColors.length;
        return tagColors[index];
    };

    useEffect(() => {
        let url = 'http://localhost:4000/history/';
        if (location.state) {
            url = `http://localhost:4000/history/?patient=${location.state.patientId}`;
        }
        axios.get(url)
            .then(response => {
                setHistories(response.data);
                setOriginalHistories(response.data);
            })
            .catch(error => {
                console.error("Request failed:", error);
            });
    }, [location]);
    const confirmDelete = (historyId) => {
        axios.delete(`http://localhost:4000/history/${historyId}`)
            .then(response => {
                window.location.reload();
                message.success('Xoá thành công');
            })
            .catch(error => {
                message.error('Xoá thất bại');
                console.error("Delete request failed:", error);
            });
    };

    const handleSearch = (value) => {
        const filteredHistories = originalHistories.filter((history) => {
            const fullnameMatch = history.fullname
                .toLowerCase()
                .includes(value.toLowerCase());
            const phoneMatch = history.phoneNumber
                .toLowerCase()
                .includes(value.toLowerCase());
            const examContentMatch = history.examContent
                .toLowerCase()
                .includes(value.toLowerCase());

            const symptomMatch = history.symptom
                .toLowerCase()
                .includes(value.toLowerCase());
            const diagnosisMatch = history.diagnosis
                .toLowerCase()
                .includes(value.toLowerCase());
            return fullnameMatch || phoneMatch || examContentMatch || diagnosisMatch || symptomMatch;
        });

        setHistories(filteredHistories);
    };

    return (
        <div className='show-post-page row'>
            <div className="col-md-2 col-3">
                <Sidebar />
            </div>
            <div className="col-md-10 col-9 show-post-box">
                <div className="show-post-title">
                    <h3 className="title_part_show-post">Lịch Sử Thăm Khám</h3>
                </div>

                <div className='show-patient-content'>
                    <div className='btn-box'>
                        <Link to={'/history/create'}>
                            <button className='history-create-button btn'>Tạo mới</button>
                        </Link>
                        <Search
                            placeholder="Tìm kiếm lịch sử thăm khám"
                            allowClear
                            enterButton="Search"
                            size="large"
                            className="w-50 search-box ms-5"
                            onSearch={handleSearch}
                        />
                    </div>
                    <ShowInvoiceModal
                        isOpen={modalInvoiceOpen}
                        onClose={closeInvoiceModal}
                        data={invoiceData}
                    />
                    <div className='table-box table-responsive mb-5 mt-3'>
                        <Table dataSource={histories} onChange={handleChange}  pagination={{ pageSize: 5 }}>
                            <Column
                                title="STT"
                                dataIndex="index"
                                key="index"
                                align="center"
                                render={(text, record, index) => { console.log(record); return index + 1 }}
                            />
                            <Column
                                title="Họ và tên"
                                dataIndex="fullname"
                                key="fullname"
                                align="center"
                                sorter={(a, b) => a.first_name.localeCompare(b.first_name)}
                                sortOrder={sortedInfo.columnKey === 'fullname' && sortedInfo.order}
                                render={(fullname) => {
                                    const splitName = fullname.split(' ');
                                    const lastName = splitName[splitName.length - 1];
                                    const firstName = splitName[0];
                                    const initials = firstName.charAt(0) + lastName.charAt(0);
                                    return (
                                        <div className='columnName'>
                                            <Avatar style={{ backgroundColor: getRandomColor(initials), color: '#fff' }} className='me-2'>{initials}</Avatar>
                                            {fullname}
                                        </div>

                                    );
                                }}
                            />
                            <Column title="Ngày thăm khám" align="center" dataIndex="examDate" key="examDate" render={examDate => format(new Date(examDate), 'dd/MM/yyyy')}
                                sorter={(a, b) => new Date(a.examDate) - new Date(b.examDate)}
                                sortOrder={sortedInfo.columnKey === 'examDate' && sortedInfo.order}
                            />
                            <Column
                                title="Nội dung khám"
                                dataIndex="examContent"
                                key="examContent"
                                render={(examContent) => (
                                    <div>
                                        <Tag color={hashColor(examContent)}>
                                            <b>{examContent}</b>
                                        </Tag>
                                    </div>
                                )}
                            />
                            <Column title="Triệu chứng" dataIndex="symptom" key="symptom" align="center" />
                            <Column title="Chẩn đoán" dataIndex="diagnosis" key="diagnosis" align="center" />
                            <Column title="Hóa đơn" dataIndex="invoice" key="invoice" align="center"

                                render={(invoice) => (
                                    <div onClick={() => handleShowInvoice(invoice)}>
                                        <box-icon name='notepad' style={{ cursor: 'pointer' }}></box-icon>
                                    </div>
                                )}

                            />

                            <Column
                                title="Action"
                                key="action"
                                align="center"
                                render={(text, record) => (
                                    <Space size="middle">
                                        <Link to={`/history/${record._id}`} className="me-2">
                                            <box-icon name='edit' color='#624DE3'></box-icon>
                                        </Link>
                                        <Link><Popconfirm
                                            title="Xóa lịch sử khám"
                                            align="center"
                                            description="Bạn có chắc chắn muốn xóa?"
                                            onConfirm={() => confirmDelete(record._id)}
                                            okText="Xác nhận"
                                            cancelText="Hủy"
                                            className="me-2"
                                        >
                                            <box-icon name='trash' color='#A30D11'></box-icon>
                                        </Popconfirm> </Link>

                                    </Space>
                                )}
                            />
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowHistory;
