import React, { useContext, useEffect, useState } from 'react';
import { formatISO9075 } from 'date-fns';
import { useParams } from 'react-router-dom';
import './PostDetail.css';
import {Link} from 'react-router-dom';
import Sidebar from "../../../components/Sidebar";
import {UserContext} from "../../../context/UserContext";
export default function PostDetail() {
    const { id } = useParams();
    const {userInfo} = useContext(UserContext);
    const [postInfo, setPostInfo] = useState(null);

    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:4000/posts/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                })
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                setPostInfo(null);
            });
    }, [id]);

    if (!postInfo) return null;

    return (
        <div className='detail-post-page row'>
            <div className="col-md-2 col-3">
                <Sidebar />
            </div>
            <div className="col-md-10 col-9 show-post-box">
                <div className="detail-post-title">
                    <h3 className="title_part_show-post">Chi Tiết Bài Viết</h3>
                </div>
                <div className='detail-post-content'>
                    <h1>{postInfo.title}</h1>
                    <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
                    <div className="author">Người đăng: {postInfo.author.first_name} {postInfo.author.last_name}</div>
                    {
                        userInfo._id === postInfo.author._id && (
                            <div className='edit-row'>
                                <Link className='edit-btn' to={`/posts/edit/${id}`}>
                                    <box-icon type='solid' name='edit' color="white"></box-icon> Chỉnh sửa bài viết
                                </Link>
                            </div>
                        )
                    }
                    <div className="image-cover-post-detail">
                        <img src={'http://localhost:4000/' + postInfo.cover} alt="..." />
                    </div>

                    <div className='main-content' dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
                </div>
            </div>
        </div>
    );
}
