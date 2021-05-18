import React, { useState } from "react"
import BlogCard from "./BlogCard"
import Footer from "./Footer"
import api from '../api'

function Home(){

    let [blogs, setBlogs] = useState(()=>[])

    let[new_page, setNew_page] = useState({
        topic: "",
        description: "",
        title: [],
        blogs: []
    })

    const getData = async ()=>{
        await api.getAllPages().then(res => {
            setBlogs(res.data.data)
        })
    }

    const card = (blog) => {
        
        return(
            <BlogCard
            key={blog._id}
            id={blog._id}
            topic={blog.topic}
            description={blog.description}
            time={blog.updatedAt} 
            />
        );
    }

    const changeEle = (event) => {
        const {name, value} = event.target
        setNew_page(prevValue => {
            return{
                ...prevValue,
                [name]: value
            }
        })
    }

    const submitPage = async() => {
        api.insertPage(new_page).then(res => {
            setNew_page({
                topic: "",
                description: "",
                title: [],
                blogs: []
            })
        })
        await api.getAllPages().then(res => {
            setBlogs(res.data.data)
        })
    }

    const Home_bkg = () => {
        getData()
        return(
            <div></div>
        );
    }

    return(
        <div>
            <Home_bkg />

            <div className="home-bkg">
                <h1 className="home-bkg-text">BLOG IT<span className="home-bkg-text-dash"> |</span></h1>
            </div>

            {/* following cards info will be mapped with info from DB */}
            <div className="container card-cont">
                <h1>BLOG TOPICS</h1>
                <div className="row g-4">
                    { blogs.map(card) }
                </div>
            </div>

            <button className="btn btn-primary col-btn" type="button" data-bs-toggle="collapse" data-bs-target="#pageForm" aria-expanded="false" aria-controls="collapseExample">
                ➕ Topic
            </button>

            <div className="collapse page-form" id="pageForm">
                <div className="create-blog">
                    <h3>Topic:</h3>
                    <input name="topic" type="text" onChange={changeEle} value={new_page.topic}></input>
                    <h3>Description:</h3>
                    <textarea name="description" rows="5" cols="80" onChange={changeEle} value={new_page.description}></textarea>
                    <br />
                    <button className="btn btn-primary" onClick={submitPage}>Submit</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home