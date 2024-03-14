import React, { useEffect, useState } from 'react';
import Sidebar from "../../../components/Sidebar";
import { Link } from 'react-router-dom';
import './ShowPatient.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const ShowPatient = () => {
    const [patients, setPatients] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:4000/patient/')
            .then(response => {
                setPatients(response.data);
                const calculatedPages = Math.ceil(response.data.length / 5);
                setTotalPages(calculatedPages);
            })
            .catch(error => {
                console.error("Request failed:", error);
            });
    }, []);

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const indexOfLastPatient = (currentPage + 1) * 5;
    const indexOfFirstPatient = indexOfLastPatient - 5;
    const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

    return (
        <div className='show-post-page row'>
            <div className="col-md-2 col-3">
                <Sidebar />
            </div>
            <div className="col-md-10 col-9 show-post-box">
                <div className="show-post-title">
                    <h3 className="title_part_show-post">Quản lý bệnh nhân</h3>
                </div>

                <div className='show-patient-content'>
    <div className='btn-box'>
        <Link to={'/patients/create'}>
            <button className='patient-create-button btn btn-warning'>Tạo mới</button>
        </Link>
    </div>
    <div className='table-box table-responsive'>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Họ và tên</th>
                    <th scope="col">Tuổi</th>
                    <th scope="col">Giới tính</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Thao tác</th>
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
                                <box-icon name='edit' color='#624DE3'></box-icon>
                            </Link>
                            <Link to={`/patients/${patient._id}`} className="me-2">
                                <box-icon name='trash' color='#A30D11'></box-icon>
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
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='paeg-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakClassName="paeg-item"
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'
    />
</div>
            </div>
        </div>
    );
};

export default ShowPatient;
