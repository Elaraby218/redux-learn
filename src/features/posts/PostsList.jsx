import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsErrors,
  getPostsStatus,
  fetchPosts,
} from "./postSlice";
import { useEffect } from "react";

import PostsExcerpt from "./PostsExcerpt";


const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsErrors);

  useEffect(()=>{
    if(postStatus ==='idle'){
        dispatch(fetchPosts()) ;
    }
  },[postStatus,dispatch]) ;

  let content ; 
  if(postStatus === 'loading'){
    content = <p>Loading...</p> ; 
  } else if (postStatus === 'succeeded'){
    content = posts.map(post => <PostsExcerpt key={post.id} post={post} /> ) ;
  } else if (postStatus === 'failed'){
    content = <p>{error}</p>
  }

  return (
    <>
      <h2>Posts</h2>
      <section>{content}</section>
    </>
  );
};

export default PostsList;
