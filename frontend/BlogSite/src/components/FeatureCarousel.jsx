  import { motion, useTransform, useScroll } from "framer-motion"
  import { useEffect, useRef } from "react"

  //context
  import useBlogsContext from "../hooks/useBlogsContext";
  import useAuthContext from "../hooks/useAuthContext";

  //components
  import BlogCard from "./BlogCard"
  import Navbar from "./Navbar"



  export default function FeatureCarousel() {
    
    const { blogs, dispatch } = useBlogsContext();
    const { user } = useAuthContext();

    console.log(user);

    useEffect(() => {
      async function fetchBlogs() {
        const response = await fetch('http://localhost:4500/api/blogs', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        const json = await response.json();

        if (!response.ok) {
          console.log(json.error);
        }

        if (response.ok) {
          dispatch({type: 'SET_BLOGS', payload: json});
          console.log(json);
        }
      }
      
      if (user) {
        fetchBlogs();
      }

    }, [dispatch, user]);




    //Horizontal Scrolling
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,  
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);



    return (
      <section className="carousel" ref={targetRef}>

        <div className="carousel-viewport">

          <Navbar />

          <div className="carousel-header">

            <div className="carousel-title">
              <img className="carousel-profile-pic" src={user.profilePic}/>
              <div>
                <h1>{user.userName}</h1>
                <p>{user.blogDesc}</p>
              </div>
            </div>

            <div className="carousel-controls">
              <button className="add-new">Add New Post</button>
              <button>←</button>
              <p>{1}</p>
              <button>→</button>
            </div>

          </div>

          <motion.div style={{ x }} className="carousel-content">
            {blogs ? 
              blogs.map((blog) => {
                return <BlogCard card={blog} key={blog._id} />
              })
              :
              <h2>Loading...</h2>
            }
          </motion.div>
          

          <div className="carousel-bottom-dash" />

        </div>
      </section>
    )
  }