import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { Link } from "react-router-dom";
import "./ShowPatient.css";
import axios from "axios";
import { Table,Input, Popconfirm, Avatar, Button } from 'antd';
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
const ShowPatient = () => {
    const { Search } = Input;
    const navigate = useNavigate();
    const [sortedInfo, setSortedInfo] = useState({});
    const [patients, setPatients] = useState([]);
    const [originalPatients, setOriginalPatients] = useState([]);
    const handleDelete = async (id) => {
        const result = await axios.delete(`${process.env.REACT_APP_API_URL}/patient/${id}`);
        if (result.status === 200) {
            window.location.reload();
        } else {
            alert("Error deleting");
        }
    };
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/patient/`)
            .then((response) => {
                setPatients(response.data);
                setOriginalPatients(response.data);
            })
            .catch((error) => {
                console.error("Request failed:", error);
            });
    }, []);
    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };
    const hashColor = (str) => {
        const colors = ['#fde3cf', '#f56a00', '#d4380d', '#ffbb96', '#ff7a45', '#722ed1', '#9254de', '#1890ff', '#096dd9', '#0050b3', '#13c2c2', '#36cfc9'];
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % colors.length;
        return colors[index];
    };
    const handleSearch = (value) => {
        const filteredPatients = originalPatients.filter((patient) => {
            const fullnameMatch = patient.fullname
                .toLowerCase()
                .includes(value.toLowerCase());
            const addressMatch = patient.address
                .toLowerCase()
                .includes(value.toLowerCase());
            return fullnameMatch || addressMatch;
        });
        setPatients(filteredPatients);
    };
    const handleToMedicalHistory = (historyId) => {
        navigate(`/medical-record/${historyId}`);
    }
    const handleToHistory = (patient) => {
        navigate('/history/show',  { state: {patientId: patient._id, patientName: patient.fullname, patientPhone: patient.phone_number} });
    }
    const columns = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
            align: "center",
            render: (text, record, index) => { return index + 1 }
        },
        {
            title: "Họ và tên",
            dataIndex: "fullname",
            key: "fullname",
            align: "center",
            sorter: (a, b) => a.first_name.localeCompare(b.first_name),
            sortOrder: sortedInfo.columnKey === 'fullname' && sortedInfo.order,
            render: (fullname) => {
                const splitName = fullname.split(' ');
                const lastName = splitName[splitName.length - 1];
                const firstName = splitName[0];
                const initials = firstName.charAt(0) + lastName.charAt(0);
                return (
                    <div className='columnName'>
                        <Avatar style={{ backgroundColor: hashColor(initials), color: '#fff' }} className='me-2'>{initials}</Avatar>
                        {fullname}
                    </div>

                );
            },
        },
        {
            title: 'Tuổi',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone_number',
            key: 'phone_number'
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Lịch sử thăm khám',
            dataIndex: 'histories',
            key: 'histories',
            render: (histories, record) => {
                return (
                    <div className="record-icon">
                            {/* <GoHistory size="25px"
                                color="black" /> */}
                                <Button onClick={()=> handleToHistory(record)}>Xem</Button>
                    </div>

                );
            }
        },
        {
            title: 'Hồ sơ bệnh án',
            dataIndex: 'medical_record',
            key: 'medical_record',
            render: (medical_record, record) => {
                return (
                    <div className="record-icon">
                            <HiOutlineClipboardDocumentList size="25px"
                                color="black"  style={{cursor: "pointer"}} onClick={() =>handleToMedicalHistory(medical_record)}/>
                    </div>

                );
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (patient, record) => {
                return (<div className="action-icon mt-2">
                    <Link to={`/patients/${patient._id}`} className="me-2">
                        <box-icon name="edit" color="#624DE3"></box-icon>
                    </Link>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => handleDelete(patient._id)}
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
        },
    ];

    return (
        <div className="show-post-page row">
            <div className="col-md-2 col-3">
                <Sidebar />
            </div>
            <div className="col-md-10 col-9 show-post-box">
                <div className="show-post-title">
                    <h3 className="title_part_show-post">Quản lý bệnh nhân</h3>
                </div>

                <div className="show-patient-content">
                    <div className="btn-box">
                        <Link to={"/patients/create"}>
                            <button className="patient-create-button btn btn-warning">
                                Tạo mới
                            </button>
                        </Link>
                        <Search
                            placeholder="Tìm kiếm bệnh nhân"
                            allowClear
                            enterButton="Search"
                            size="large"
                            className="w-50 search-box ms-5"
                            onSearch={handleSearch}
                        />
                    </div>

                    <div className="table-box table-responsive mb-5 mt-3">
                        <Table dataSource={patients} columns={columns} pagination={{ pageSize: 5 }} onChange={handleChange} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowPatient;
