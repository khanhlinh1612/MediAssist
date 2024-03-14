import React, { useEffect, useState } from 'react';
import PostCard from './PostCard/PostCard';
import Sidebar from "../../../components/Sidebar";
import './ShowPost.css';
const ShowPost = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4000/posts', {}) //default method is GET
            .then(response => response.json().then(
                posts => {
                    setPosts(posts);
                }
            ))
            .catch(err => console.error(err))
    }, [])

    return (
        <div className='show-post-page row'>
            <div className="col-md-2 col-3">
                <Sidebar />
            </div>
            <div className="col-md-10 col-9 show-post-box">
                <div className="show-post-title">
                    <h3 className="title_part_show-post">Quản lý bài viết</h3>
                </div>

                <div className='show-post-content justify-content-between'>
                    <div className='row show-post-card'>
                        {posts.length > 0 && posts.map(post => {
                            return <PostCard {...post} />
                        })

                        }
                    </div>
                </div>

            </div>
        </div>
    );
}
export default ShowPost;
