import { motion, useTransform, useScroll } from "framer-motion"
import { useRef } from "react"

import BlogCard from "./BlogCard"
import Navbar from "./Navbar"

export default function FeatureCarousel() {

  const user = {
    author: 'KimGab',
    blogDesc: 'Daily Vinland blogs and updates',
    profilePic: 'https://www.animeexplained.com/wp-content/uploads/2023/05/Thorfinn-True-warrior-featured.jpg'
  }
  
  const cards = [{
    id: 1,
    url: 'https://staticg.sportskeeda.com/editor/2023/03/59a4b-16784801127741.png?w=840', 
    title: 'Vinland Saga',
    desc: 'How one of the best mangas ever made changed my life.',
    date: '5 days ago'  
  }, 
  {
    id: 2,
    url: 'https://staticg.sportskeeda.com/editor/2023/02/2d081-16763146587526.png?w=840', 
    title: 'Saga Vinland',
    desc: 'How one of the worst mangas ever made destroyed my life.',
    date: '3 days ago'  
  }, 
  {id: 3,
    url: 'https://staticg.sportskeeda.com/editor/2023/03/59a4b-16784801127741.png?w=840', 
    title: 'Vinland Saga',
    desc: 'How one of the best mangas ever made changed my life.',
    date: '5 days ago'  
  }, 
  {
    id: 4,
    url: 'https://staticg.sportskeeda.com/editor/2023/02/2d081-16763146587526.png?w=840', 
    title: 'Saga Vinland',
    desc: 'How one of the worst mangas ever made destroyed my life.',
    date: '3 days ago'  
  }, {
    id: 5,
    url: 'https://staticg.sportskeeda.com/editor/2023/03/59a4b-16784801127741.png?w=840', 
    title: 'Vinland Saga',
    desc: 'How one of the best mangas ever made changed my life.',
    date: '5 days ago'  
  }, 
  {
    id: 6,
    url: 'https://staticg.sportskeeda.com/editor/2023/02/2d081-16763146587526.png?w=840', 
    title: 'Saga Vinland',
    desc: 'How one of the worst mangas ever made destroyed my life.',
    date: '3 days ago'  
  }, 
  {id: 7,
    url: 'https://staticg.sportskeeda.com/editor/2023/03/59a4b-16784801127741.png?w=840', 
    title: 'Vinland Saga',
    desc: 'How one of the best mangas ever made changed my life.',
    date: '5 days ago'  
  }, 
  {
    id: 8,
    url: 'https://staticg.sportskeeda.com/editor/2023/02/2d081-16763146587526.png?w=840', 
    title: 'Saga Vinland',
    desc: 'How one of the worst mangas ever made destroyed my life.',
    date: '3 days ago'  
  }];

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
              <h1>{user.author}</h1>
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
          {cards.map((card) => {
            return <BlogCard card={card} key ={card.id}/>
          })}
        </motion.div>

        <div className="carousel-bottom-dash" />

      </div>
    </section>
  )
}