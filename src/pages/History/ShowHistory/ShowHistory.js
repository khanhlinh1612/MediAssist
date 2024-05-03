import React, { useEffect, useState } from 'react';
import Sidebar from "../../../components/Sidebar";
import { Link, useLocation} from 'react-router-dom';
import './ShowHistory.css';
import axios from 'axios';
import { format } from 'date-fns';
import ReactPaginate from 'react-paginate';
import { Input } from "antd";
const ShowHistory = () => {
    const { Search } = Input
    const [histories, setHistories] = useState([]);
    const [originalHistories, setOriginalHistories] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedHistoryId, setSelectedHistoryId] = useState(null); // State for storing the id of the history to be deleted
    const location = useLocation();
    useEffect(() => {
        let url = 'http://localhost:4000/history/';
        if (location.state) {
            url = `http://localhost:4000/history/?patient=${location.state.patientId}`;
        }
        axios.get(url)
            .then(response => {
                setHistories(response.data);
                setOriginalHistories(response.data);
                const calculatedPages = Math.ceil(response.data.length / 5);
                setTotalPages(calculatedPages);
            })
            .catch(error => {
                console.error("Request failed:", error);
            });
    }, [location]);

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const indexOfLastHistory = (currentPage + 1) * 5;
    const indexOfFirstHistory = indexOfLastHistory - 5;
    const currentHistories = histories.slice(indexOfFirstHistory, indexOfLastHistory);

    const handleToDelete = (historyId) => {
        setSelectedHistoryId(historyId);
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:4000/history/${selectedHistoryId}`)
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
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
        const calculatedPages = Math.ceil(filteredHistories.length / 5);
        setTotalPages(calculatedPages);
        setHistories(filteredHistories);
        setCurrentPage(0); // Đảm bảo trang hiện tại trở về trang 0 sau khi tìm kiếm
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
                        className="w-50 search-box ms-4"
                        onSearch={handleSearch}
                    />
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
                                        <th scope="col">Actions</th>
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
                                                <Link className="me-2" onClick={() => handleToDelete(history._id)} data-bs-toggle="modal" data-bs-target="#confirmDeleteModal">
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

            <div className="modal fade" id="confirmDeleteModal" tabIndex="-1" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="confirmDeleteModalLabel">Xác Nhận Xóa</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Bạn có chắc chắn muốn xóa lịch sử này?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                            <button type="button" className="btn btn-danger" onClick={confirmDelete}>Xác Nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowHistory;
