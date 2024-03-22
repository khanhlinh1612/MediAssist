import React, { useEffect, useState } from 'react';
import Sidebar from "../../../components/Sidebar";
import { Link, useLocation } from 'react-router-dom';
import './ShowHistory.css';
import axios from 'axios';
import { format } from 'date-fns';
import ReactPaginate from 'react-paginate';

const ShowHistory = () => {
    const [histories, setHistories] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const location = useLocation();
    useEffect(() => {
        let url = 'http://localhost:4000/history/';
        if (location.state) {
            url = `http://localhost:4000/history/?patient=${location.state.patientId}`;
        }
        console.log(url);
        axios.get(url)
            .then(response => {
                console.log(response.data)
                setHistories(response.data);
                const calculatedPages = Math.ceil(response.data.length / 5);
                setTotalPages(calculatedPages);
            })
            .catch(error => {
                console.error("Request failed:", error);
            });
        console.log(location);
    }, [location]);

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const indexOfLastHistory = (currentPage + 1) * 5;
    const indexOfFirstHistory = indexOfLastHistory - 5;
    const currentHistories = histories.slice(indexOfFirstHistory, indexOfLastHistory);

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
                    </div>
                    {
                        histories.length === 0 && (
                        <div className='empty-title-box'>
                            <h1>Hiện chưa có lịch sử thăm khám nào được tạo</h1>
                        </div>)
                    }
                    {
                        histories.length > 0 && (<div className='table-box table-responsive mb-5'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Bệnh nhân</th>
                                    <th scope="col">Nội dung khám</th>
                                    <th scope="col">Ngày thăm khám</th>
                                    <th scope="col">Triệu chứng</th>
                                    <th scope="col">Chẩn đoán</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentHistories.map((history, index) => (
                                    <tr key={history._id}>
                                        <td>{currentPage * 5 + index + 1}</td>
                                        <td className='col-content'>{history.fullname}</td>
                                        <td className='col-content'>{history.examContent}</td>
                                        <td className='col-content'>{format(history.examDate, 'dd-MM-yyyy')}</td>
                                        <td className='col-content1'>{history.symptom}</td>
                                        <td className='col-content'>{history.diagnosis}</td>
                                        <td>
                                            <Link to={`/history/${history._id}`} className="me-2">
                                                <box-icon name='edit' color='#624DE3'></box-icon>
                                            </Link>
                                            <Link to={`/history/${history._id}`} className="me-2">
                                                <box-icon name='trash' color='#A30D11'></box-icon>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    )
                    }
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

export default ShowHistory;
