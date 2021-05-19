import { useState } from "react"
import api from "../api";
import LoadScr from "./LoadScr"
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

function BlogPage(){

   const { pathname } = useLocation();

   let [blog_, setBlog_]= useState({
    _id: "",
    topic:"",
    description: "",   
    title:[],
    blogs:[]
   })

   let [new_title, setNew_title] = useState("")

   let [new_cont, setNew_cont] = useState("")

   let [load, setLoad] = useState(false)

    useState(async () => {
        await api.getBlogById(pathname.slice(10,)).then(res => {
            setBlog_(res.data.data)
        })
    },[]) 

    function posts(post, idx){
        return(
            <div className="blog" key={idx}>
                <h3 style={{fontWeight: "650", color:"#0d6efd"}}>{post}</h3>
                <p>{blog_.blogs[idx].substr(0,75)}<span style={{color:"#0d6efd"}}>...</span></p>
                <button type="button" className="btn btn-primary blog-btn" data-bs-toggle="modal" data-bs-target={`#a${idx.toString()}`}>
                    Read More
                </button>
                {/* Modal */}
                <div className="modal fade" id={`a${idx.toString()}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{post}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                 {blog_.blogs[idx]}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const changeTitle = (event) =>{
        setNew_title(event.target.value)
    }

    const changeCont = (event) =>{
        setNew_cont(event.target.value)
    }

    const submitBlog = async () => {
        setLoad(true)
        let new_blog = await (await api.getBlogById(pathname.slice(10,))).data.data
        new_blog.title.push(new_title)
        new_blog.blogs.push(new_cont)
        await api.updateBlogById(pathname.slice(10,), new_blog).then(res =>{
            setNew_title("");
            setNew_cont("");
        })
        await api.getBlogById(pathname.slice(10,)).then(res => {
            setBlog_(res.data.data)
        })
        setLoad(false)
    }

    function gotoTop(){
        document.documentElement.scrollTop = 0;
    }

    const Blog_intro = () => {
        return(
            <div className="blog-page-intro">
                <h1 className="text-muted">Topic:</h1>
                <h1 style={{textDecoration: "underline"}}>{blog_.topic}</h1>
                <h1 className="text-muted">About:</h1>
                <h4>{blog_.description}</h4>
            </div>
        )
    }

    return(
        <div>
            <Blog_intro />
            <div className="blog-page-feat">
                <hr />
                <div>
                    <h1 className="text-muted">BLOGS</h1>
                    {blog_.title.length===0?<div><h3 style={{color:"red"}}>Nothing here yet.</h3><h3 style={{color:"#0d6efd"}}>Go ahead add a blog.</h3></div>:blog_.title.map(posts)}
                </div>
                <hr />
                <h1 className="text-muted">Add a blog</h1>
                <button className="btn btn-primary col-btn" type="button" data-bs-toggle="collapse" data-bs-target="#blogForm" aria-expanded="false" aria-controls="collapseExample">
                    ➕ Blog
                </button>

                <div className="collapse page-form" id="blogForm">
                    <div className="create-blog">
                        <div className="">
                            <h4>Title</h4>
                            <input type="text" onChange={changeTitle} value={new_title}></input>
                        </div>
                        <div className="">
                            <h4>Blog</h4>
                            <textarea  name="cont" className="" rows="10" cols="80" onChange={changeCont} value={new_cont}></textarea>
                        </div>
                        <br />
                        <button className="btn btn-primary" onClick={submitBlog}>Submit</button>
                    </div>
                </div>
                <hr />
                <button className="btn btn-primary back-top-btn" onClick={gotoTop}>TOP</button>
            </div>
            {load  ? <LoadScr vis={"visible"}/>: <LoadScr vis={"hidden"}/>}
            <Footer />
        </div>


    );
}

export default BlogPage;