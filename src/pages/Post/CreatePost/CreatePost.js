import React, { useState } from 'react';
import Sidebar from "../../../components/Sidebar";
import { Navigate, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CreatePost.css';

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
    ]
};

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState(null);
    const [errors, setErrors] = useState({});
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!title || title.length > 100) {
            newErrors.title = "Title is required and should be less than 100 characters.";
        }
        if (!summary || summary.length > 200) {
            newErrors.summary = "Summary is required and should be less than 200 characters.";
        }
        if (!content) {
            newErrors.content = "Content is required.";
        }
        if (!files || files.length === 0) {
            newErrors.files = "File is required.";
        } else if (!['image/jpeg', 'image/png', 'image/gif'].includes(files[0].type)) {
            newErrors.files = "Invalid file type. Only JPEG, PNG, and GIF are allowed.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleToShowPost = () => {
        setTitle('');
        setSummary('');
        setContent('');
        setFiles(null);
        navigate('/posts/show');
    }

    const createNewPost = (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('file', files[0]);
        data.set('content', content);

        fetch('http://localhost:4000/posts', {
            method: 'POST',
            body: data,
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    setRedirect(true);
                }
            })
            .catch(error => {
                alert("Failed to create post");
                console.error("Request failed:", error);
            });
    }

    if (redirect) {
        return <Navigate to={'/posts/show'} />
    }

    return (
        <div className='create-post-page row'>
            <div className="col-md-2 col-3">
                <Sidebar />
            </div>
            <div className="col-md-10 col-9 show-post-box">
                <div className="detail-post-title">
                    <h3 className="title_part_show-post">Tạo Bài Viết Mới</h3>
                </div>
                <div className="col-md-10 col-9 create-post-content ps-5 pb-2">
                    <form onSubmit={createNewPost}>
                        <div className="form-group w-50">
                            <label className="bold-label" htmlFor="title">Title</label>
                            <input
                                id="title"
                                className="form-control"
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                            {errors.title && <small className="text-danger">{errors.title}</small>}
                        </div>
                        <div className="form-group w-50">
                            <label className="bold-label" htmlFor="summary">Summary</label>
                            <input
                                id="summary"
                                className="form-control"
                                type="text"
                                placeholder="Summary"
                                value={summary}
                                onChange={(event) => setSummary(event.target.value)}
                            />
                            {errors.summary && <small className="text-danger">{errors.summary}</small>}
                        </div>
                        <div className="form-group w-50">
                            <label className="bold-label" htmlFor="files">Files</label>
                            <input
                                id="files"
                                className="form-control"
                                type="file"
                                onChange={(event) => setFiles(event.target.files)}
                            />
                            {errors.files && <small className="text-danger">{errors.files}</small>}
                        </div>
                        <div className="form-group w-75">
                            <label className="bold-label" htmlFor="content">Content</label>
                            <ReactQuill
                                id="content"
                                className="form-control"
                                value={content}
                                modules={modules}
                                onChange={newValue => setContent(newValue)}
                            />
                            {errors.content && <small className="text-danger">{errors.content}</small>}
                        </div>
                        <div className='button-group mt-3'>
                            <button type="button" onClick={handleToShowPost} className='btn btn-warning d-flex align-items-center justify-content-center'>Hủy</button>
                            <button type="submit" className='btn btn-success ms-2'>Tạo mới</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
