import { motion, useTransform, useScroll } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";
import axios from "axios";

//context
import useBlogsContext from "../hooks/useBlogsContext";
import useAuthContext from "../hooks/useAuthContext";

//components
import BlogCard from "./BlogCard"
import Navbar from "./Navbar"
import BlogForms from "./BlogForms";

//hooks
import usePostBlog from "../hooks/usePostBlog";



  export default function FeatureCarousel() {
    
    const { blogs, dispatch } = useBlogsContext();
    const { user } = useAuthContext();
    const { isLoading } = usePostBlog();


    const [isNewBlog, setIsNewBlog] = useState(false);

    const client = axios.create({
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })


    //Fetch blogs
    useEffect(() => {
      async function fetchBlogs() {

        await client.get('http://localhost:4500/api/blogs')
          .then((blogs) => {
            dispatch({type: 'SET_BLOGS', payload: blogs.data}); 
          })
          .catch((error) => {
            console.error(error);
          })
      }
      
      if (user) {
        fetchBlogs();
      }

    }, [dispatch, user]);


    //Prop for blog forms
    function closeBlogForm() {
      setIsNewBlog(false);
    };


    //Horizontal Scrolling
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,  
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);



    return (
      <section className="carousel" ref={targetRef}>

        <div className="carousel-viewport">

          {isNewBlog ? 
            <BlogForms onClose={closeBlogForm}/>
            :
            <></>
          }

          <Navbar />

          <div className="carousel-header">

            <div className="carousel-title">
              
              <Link to={`/users/${user.email}`}>
                <img className="carousel-profile-pic" src={`http://localhost:4500/userImages/${user.profilePic}`}/>
              </Link>

              <div>
                <Link to={`/users/${user.userName}`}>
                  <h1>{user.userName}</h1>
                </Link>
                <p>{user.blogDesc}</p>
              </div>

            </div>

            <div className="carousel-controls">
              <button className="add-new" onClick={() => setIsNewBlog(true)}>Add New Post</button>
              <button>←</button>
              <p>{1}</p>
              <button>→</button>
            </div>

          </div>

          <motion.div style={{ x }} className="carousel-content">
            {blogs && !isLoading ? 
              blogs.map((blog) => {
                return <BlogCard card={blog} key={blog._id}/>
              })
              :
              <h2 className="no-blogs">Loading...</h2>
            }
          </motion.div>
          

          <div className="carousel-bottom-dash" />

        </div>
      </section>
    )
  }