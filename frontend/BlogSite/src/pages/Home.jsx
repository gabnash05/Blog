import BlogCard from "../components/BlogCard"


export default function Home() {

  const card = {id: 1,
                url: 'https://staticg.sportskeeda.com/editor/2023/03/59a4b-16784801127741.png?w=840', 
                title: 'Vinland Saga',
                desc: 'How one of the best mangas ever made changed my life.',
                date: '5 days ago'  
              }

  return (
    <div>
      <div>

      </div>

      <BlogCard card={card}/>

      <div>

      </div>
    </div>
  )
}