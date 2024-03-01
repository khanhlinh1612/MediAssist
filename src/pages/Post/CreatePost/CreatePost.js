import React, { useState } from 'react';
import Sidebar from "../../../components/Sidebar";
import {Navigate} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CreatePost.css';

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

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    function createNewPost(event) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('file', files[0]);
        data.set('content', content);
        event.preventDefault();
        fetch('http://localhost:4000/posts', {
            method: 'POST',
            body: data,
            credentials: 'include',
        })
        .then(response => {
            if(response.ok){
                setRedirect(true);
            }
        })
        .catch( error =>
            {
                alert("Failed post creations");
                console.error("Request failed:", error);
            }
        )
    }
    if(redirect) {
        return <Navigate to={'/show-post'}/>
    }
    return (
        <div className='create-post-page row'>
            <div className="col-md-2 col-3">
                <Sidebar />
            </div>

            <div className="col-md-10 col-9 create-post-content">
                <form onSubmit={createNewPost}>
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

                            onChange={(event) => {setFiles(event.target.files)}}
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
                    <button type="submit" className="btn btn-primary mt-5">Submit</button>
                </form>
            </div>
        </div>
    );
}
