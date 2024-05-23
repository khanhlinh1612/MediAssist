import React, { useState, useEffect } from 'react';
import Sidebar from "../../../components/Sidebar";
import { Navigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import './EditPost.css';

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']
    ]
};

export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then((response) => response.json().then(postInfo => {
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
            }))
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            })

    }, [id]);

    function updatePost(event) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('id', id);
        data.set('content', content);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        event.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
            method: 'PUT',
            body: data,
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    setRedirect(true);
                }
            })
            .catch(error => {
                alert("Failed post update");
                console.error("Request failed:", error);
            }
            )
    }
    if (redirect) {
        return <Navigate to={'/posts/' + id} />
    }
    return (
        <div className='create-post-page row'>
            <div className="col-md-2 col-3">
                <Sidebar />
            </div>
            <div className="col-md-10 col-9 show-post-box">
                <div className="detail-post-title">
                    <h3 className="title_part_show-post">Chỉnh Sửa Bài Viết</h3>
                </div>
                <div className="col-md-10 col-9 create-post-content ps-5">
                    <form onSubmit={updatePost}>
                        <div className="form-group w-50">
                            <label className="bold-label" htmlFor="title">Title</label>
                            <input
                                id="title"
                                className="form-control"
                                type="text"
                                placeholder={'Title'}
                                value={title}
                                onChange={(event) => { setTitle(event.target.value) }}
                            />
                        </div>
                        <div className="form-group w-50">
                            <label className="bold-label" htmlFor="summary">Summary</label>
                            <input
                                id="summary"
                                className="form-control"
                                type="text"
                                placeholder={'Summary'}
                                value={summary}
                                onChange={(event) => { setSummary(event.target.value) }}
                            />
                        </div>
                        <div className="form-group w-50">
                            <label className="bold-label" htmlFor="files">Files</label>
                            <input
                                id="files"
                                className="form-control"
                                type="file"
                                onChange={(event) => { setFiles(event.target.files) }}
                            />
                        </div>
                        <div className="form-group w-75">
                            <label className="bold-label" htmlFor="content">Content</label>
                            <ReactQuill
                                id="content"
                                className="form-control"
                                value={content}
                                modules={modules}
                                onChange={newValue => { setContent(newValue) }}
                            />
                        </div>
                        <div className='d-flex justify-content-end pb-4'>
                        <button type="submit" className="btn btn-primary mt-5 mb-1 me-5">Cập Nhật</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}
