import React, { useEffect, useState } from 'react';
import PostCard from './PostCard/PostCard';
import Sidebar from "../../../components/Sidebar";
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import './ShowPost.css';

const { Search } = Input;

const ShowPost = () => {
    const [posts, setPosts] = useState([]);
    const [originalPosts, setOriginalPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/posts')
            .then(response => response.json())
            .then(posts => {
                console.log("This is posts", posts);
                setOriginalPosts(posts);
                setPosts(posts);
            })
            .catch(err => console.error(err))
    }, [])

    const handleSearch = value => {
        // Filter posts based on title, author, or description
        const filteredPosts = originalPosts.filter(post => {
            const titleMatch = post.title.toLowerCase().includes(value.toLowerCase());
            const author_firstname_Match = post.author.first_name.toLowerCase().includes(value.toLowerCase());
            const author_lastname_Match = post.author.last_name.toLowerCase().includes(value.toLowerCase());
            const descriptionMatch = post.summary.toLowerCase().includes(value.toLowerCase());
            return titleMatch || author_firstname_Match || author_lastname_Match || descriptionMatch;
        });
        setPosts(filteredPosts);
    };

    return (
        <div className='show-post-page row'>
            <div className="col-md-2 col-3">
                <Sidebar />
            </div>
            <div className="col-md-10 col-9 show-post-box">
                <div className="show-post-title">
                    <h3 className="title_part_show-post">Quản lý bài viết</h3>
                </div>
                <div className='show-post-content1 justify-content-between'>
                    <div className='btn-box'>
                        <Link to={'/posts/create'}>
                            <button className='history-create-button btn'>Tạo bài viết mới</button>
                        </Link>
                    </div>
                    <Search
                        placeholder="Tìm kiếm bài viết"
                        allowClear
                        enterButton="Search"
                        size="large"
                        className="w-50 search-box mb-4"
                        onSearch={handleSearch}
                    />
                    {/* <Search placeholder="Tìm kiếm bài viết" onSearch={handleSearch} enterButton className="w-50 search-box" /> */}
                    <div className='row show-post-card'>
                        {posts.length > 0 && posts.map(post => (
                            <PostCard key={post._id} {...post} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowPost;
