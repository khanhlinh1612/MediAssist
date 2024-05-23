import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { formatISO9075, differenceInDays } from "date-fns";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Popconfirm } from 'antd';
import './PostCard.css';
import axios from "axios";
export default function PostCard({ _id, title, summary, cover, content, createdAt, updatedAt, author }) {
    const daysPassed = differenceInDays(new Date(), new Date(updatedAt));
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/posts/edit/${_id}`);
    };

    const handleDelete = async (id) => {
        const result = await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${_id}`);
        if (result.status === 200) {
            window.location.reload();
        } else {
            alert("Error deleting");
        }
    };

    return (
        <div className="col-xl-4 col-md-6 col-11 mb-3">
            <div className="post-card card">
                <Link to={`/posts/${_id}`}>
                    <img src={`${process.env.REACT_APP_API_URL}/` + cover} className="card-img-top" alt={title} />
                </Link>

                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to={`/posts/${_id}`}>
                            <h5 className="card-title">{title}</h5>
                        </Link>
                        <div className="group-edit">
                            <FontAwesomeIcon icon={faEdit} className="text-primary me-2 edit" onClick={handleEdit} />
                            <Popconfirm
                                title="Bạn có chắc chắn muốn xóa bài viết này không?"
                                onConfirm={handleDelete}
                                okText="Xác nhận"
                                cancelText="Hủy"
                            >
                                <FontAwesomeIcon icon={faTrashAlt} className="text-danger delete" />
                            </Popconfirm>
                        </div>
                    </div>

                    <div className="post-info">
                        <p>{author.first_name + ' ' + author.last_name}</p>
                        <p><small>{formatISO9075(new Date(createdAt))}</small></p>
                    </div>

                    <p className="card-text summary">{summary}</p>
                    <p className="card-text update-script"><small className="text-muted">Last updated {daysPassed} days ago</small></p>
                </div>
            </div>
        </div>
    );
}
