import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { Link } from "react-router-dom";
import "./ShowPatient.css";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Input } from "antd";

const ShowPatient = () => {
    const { Search } = Input
    const [patients, setPatients] = useState([]);
    const [originalPatients, setOriginalPatients] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const handleDelete = async (id) => {
        const result = await axios.delete(`http://localhost:4000/patient/${id}`);
        if (result.status === 200) {
            window.location.reload();
        } else {
            alert("Error deleting");
        }
    };
    useEffect(() => {
        axios
            .get("http://localhost:4000/patient/")
            .then((response) => {
                setPatients(response.data);
                setOriginalPatients(response.data);
                const calculatedPages = Math.ceil(response.data.length / 5);
                setTotalPages(calculatedPages);
            })
            .catch((error) => {
                console.error("Request failed:", error);
            });
    }, []);

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const indexOfLastPatient = (currentPage + 1) * 5;
    const indexOfFirstPatient = indexOfLastPatient - 5;
    const currentPatients = patients.slice(
        indexOfFirstPatient,
        indexOfLastPatient
    );

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
        const calculatedPages = Math.ceil(filteredPatients.length / 5);
        setTotalPages(calculatedPages);
        setPatients(filteredPatients);
        setCurrentPage(0);
    };

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
                            className="w-50 search-box ms-4"
                            onSearch={handleSearch}
                        />
                    </div>





                    <div className="table-box table-responsive mb-5">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Họ và tên</th>
                                    <th scope="col">Tuổi</th>
                                    <th scope="col">Giới tính</th>
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">Địa chỉ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPatients.map((patient, index) => (
                                    <tr key={patient._id}>
                                        <td>{currentPage * 5 + index + 1}</td>
                                        <td>{patient.fullname}</td>
                                        <td>{patient.age}</td>
                                        <td>{patient.gender}</td>
                                        <td>{patient.phone_number}</td>
                                        <td>{patient.address}</td>
                                        <td>
                                            <Link to={`/patients/${patient._id}`} className="me-2">
                                                <box-icon name="edit" color="#624DE3"></box-icon>
                                            </Link>
                                            <Link
                                                onClick={() => {
                                                    handleDelete(patient._id);
                                                }}
                                                className="me-2"
                                            >
                                                <box-icon name="trash" color="#A30D11"></box-icon>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={totalPages}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="paeg-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="paeg-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                    />
                </div>
            </div>
        </div>
    );
};

export default ShowPatient;
