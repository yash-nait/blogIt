import {Link} from "react-router-dom"

function BlogCard(props){

    return(
        <div className="col-lg-6">
            <div className="card h-100 border-primary">
                <div className="card-body" >
                    <h6 className="card-subtitle mb-2 text-muted">Topic</h6>
                    <h5 className="card-title" style={{textDecoration: "underline"}}>{props.topic}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">About</h6>
                    <p className="card-text">{props.description}</p>
                    <Link to={`/blogpage/${props.id}`} className="card-link">See all blogs</Link>
                </div>
                <div className="card-footer">
                    <small className="text-muted">{`Last updated on ${Date(props.time).slice(0,11)}`}</small>
                </div>
            </div>
        </div>
    );
}

export default BlogCard