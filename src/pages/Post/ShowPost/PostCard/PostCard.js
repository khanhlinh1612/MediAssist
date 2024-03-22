import { Link } from "react-router-dom";
import { formatISO9075, differenceInDays } from "date-fns";
import './PostCard.css'
export default function PostCard({ _id,title, summary, cover, content, createdAt, updatedAt, author }) {
    const daysPassed = differenceInDays(new Date(), new Date(updatedAt));
    return (
        <div className="col-xl-4 col-md-6 col-11 mb-3">
            <div className="post-card card">
                <Link to={`/posts/${_id}`}>
                    <img src={'http://localhost:4000/' + cover} className="card-img-top" alt="..." />
                </Link>

                <div className="card-body">
                    <Link to={`/posts/${_id}`}>
                        <h5 className="card-title">{title}</h5>
                    </Link>

                    <div className="post-info">
                        <p>{author.first_name + ' ' + author.last_name}</p>
                        <p ><small >{formatISO9075(new Date(createdAt))}</small></p>
                    </div>

                    <p className="card-text summary">{summary}</p>
                    <p className="card-text update-script"><small className="text-muted">Last updated {daysPassed} days ago</small></p>
                </div>
            </div>

        </div>
    );
}
