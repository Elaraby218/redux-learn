import { useSelector } from "react-redux"
import { selectAllPosts } from "./postSlice";
import PostAuthor from "./PostAuthor";

const PostsList = () => {

    const posts = useSelector(selectAllPosts) ; 

    const renderposts = posts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0,100)}</p>
            <PostAuthor userId={post.userId}/>
        </article>
    )) ; 

    return (
        <>
            <h2>Posts</h2>
            <section>
                {renderposts}
            </section>
        </>
    ) ; 
}

export default PostsList
