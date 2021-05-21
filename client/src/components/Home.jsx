import React, { useState, useEffect } from "react"
import BlogCard from "./BlogCard"
import Footer from "./Footer"
import api from '../api'
import LoadScr from "./LoadScr"
import AniScr from "./AniScr"

function Home(){

    const theme = document.querySelector("#theme-link");

    let [blogs, setBlogs] = useState(()=>[])

    let[new_page, setNew_page] = useState({
        topic: "",
        description: "",
        title: [],
        blogs: []
    })

    let [load, setLoad] = useState(false)

    useEffect(()=>{
        async function getData(){
            await api.getAllPages().then(res => {
                setBlogs(res.data.data)
            })
        }
        getData()
    },[])

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
        setLoad(true)
        await api.insertPage(new_page).then(res => {
            setNew_page({
                topic: "",
                description: "",
                title: [],
                blogs: []
            })
        })
        setLoad(false)
        await api.getAllPages().then(res => {
            setBlogs(res.data.data)
        })
    }

    const anime = () => {
        setTimeout(() => {
            window.sessionStorage.setItem("firstLoadDone", 1)
        }, 8000);  
        return(
            <AniScr />
        )
    }

    return(
        <div>
            {window.sessionStorage.getItem("firstLoadDone")===null? anime(): null}
            <div style={{display: "none"}}>{theme.href = window.sessionStorage.getItem("mode")==="1"? "styles_dark.css": "styles.css"}</div>
            <div className="home-bkg">
                <h1 className="home-bkg-text">BLOG IT<span className="home-bkg-text-dash"> |</span></h1>
            </div>

            {/* following cards info will be mapped with info from DB */}
            <div className="container card-cont">
                <h1>BLOG TOPICS</h1>
                <hr />
                <div className="row g-4">
                    {blogs.length===0?<h1 style={{color: "#0d6efd"}}>Loading ...</h1>:blogs.map(card)}
                </div>
                <hr />
            </div>

            <button className="btn btn-primary col-btn" type="button" data-bs-toggle="collapse" data-bs-target="#pageForm" aria-expanded="false" aria-controls="collapseExample">
                ➕ Topic
            </button>

            <div className="collapse page-form" id="pageForm">
                <div className="create-blog">
                    <h3>Topic:</h3>
                    <input name="topic" type="text" className="inp-field" onChange={changeEle} value={new_page.topic}></input>
                    <h3>Description:</h3>
                    <textarea className="inp-field" name="description" rows="5" cols="80" onChange={changeEle} value={new_page.description}></textarea>
                    <br />
                    <br />
                    <button className="btn btn-primary" onClick={submitPage}>Submit</button>
                </div>
            </div>
            {load  ? <LoadScr vis={"block"}/>: <LoadScr vis={"none"}/>}
            <Footer />
        </div>
    );
}

export default Home