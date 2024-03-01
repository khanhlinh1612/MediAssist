import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetail.css';
import Sidebar from "../../../components/Sidebar";

export default function PostDetail() {
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/posts/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(postInfo => {
                setPostInfo(postInfo);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                setPostInfo(null); // Set postInfo to null in case of error
            });
    }, [id]);

    if (!postInfo) return null;

    return (
        <div className='show-post-page row'>
            <div className="col-md-2 col-3">
                <Sidebar />
            </div>
            <div className="col-md-10 col-9 show-post-box">
                <div className="show-post-title">
                    <h3 className="title_part_show-post">Tạo bài viết mới</h3>
                </div>
                <div className='show-post-content'>
                    <div className="image-cover-post-detail">
                        <img src={'http://localhost:4000/uploads/' + postInfo.cover} alt="..." />
                    </div>
                    <h1>{postInfo.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
                </div>
            </div>
        </div>
    );
}
