import { Link } from "react-router-dom";
import { formatISO9075, differenceInDays } from "date-fns";
import './PostCard.css'
export default function PostCard({ _id,title, summary, cover, content, createdAt, updatedAt, author }) {
    const daysPassed = differenceInDays(new Date(), new Date(updatedAt));
    return (
        <div class="col-xl-4 col-md-5 col-8 mb-3">
            <div className="post-card card">
                <Link to='/posts/{_id}'>
                    <img src={'http://localhost:4000/uploads/' + cover} class="card-img-top" alt="..." />
                </Link>

                <div class="card-body">
                    <Link to='/posts/{_id}'>
                        <h5 class="card-title">{title}</h5>
                    </Link>

                    <div className="post-info">
                        <p>{author.first_name + ' ' + author.last_name}</p>
                        <p ><small >{formatISO9075(new Date(createdAt))}</small></p>
                    </div>

                    <p class="card-text summary">{summary}</p>
                    <p class="card-text update-script"><small class="text-muted">Last updated {daysPassed} days ago</small></p>
                </div>
            </div>

        </div>
    );
}
