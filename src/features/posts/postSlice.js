import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
import { act } from "react";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

// const initialState= [
//     {
//         id:'1' ,
//         title:'Learn Redux' ,
//         content: '6 chasdfasdfasdfasdfapters' ,
//         date: sub(new Date(), {minutes:10}).toISOString() ,
//         reactions: {
//             thumbsUp:0,
//             wow : 0 ,
//             heart: 0 ,
//             rocket: 0 ,
//             coffee: 0
//         }

//     } ,

//     {
//         id:'2' ,
//         title:'Learn Tailwind' ,
//         content: '10 chapters',
//         date: sub(new Date(), {minutes:5}).toISOString() ,
//         reactions: {
//             thumbsUp:0,
//             wow : 0 ,
//             heart: 0 ,
//             rocket: 0 ,
//             coffee: 0
//         }

//     } ,
// ]

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return [...response.data];
  } catch (err) {
    return err.message;
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    try {
      const response = await axios.post(POSTS_URL, initialPost);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deletePost = createAsyncThunk('posts/deltePost' , async (initialPost)=>{
  const {id} = initialPost ; 
  try {
    const response = await axios.delete(`${POSTS_URL}/${id}`) ; 
    if(response?.status==200) return initialPost ; 
    return `${response?.status}:${response?.statusText}` ; 
  } catch(err){
    return err.message ; 
  }
})

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },

    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });

        // Add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        const sortedPosts = state.posts.sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        });

        action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        console.log(action.payload);
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state,action)=>{
        if(!action.payload?.id){
          console.log('update could not complete');
          console.log(action.payload)
          return ; 
        }
        const {id} = action.payload ; 
        action.payload.date = new Date().toISOString() ; 
        const posts = state.posts.filter(post => post.id!== id) ; 
        state.posts = [...posts,action.payload] ; 
      })
      .addCase(deletePost.fulfilled,(state,action)=>{
        if(!action.payload?.id){
          console.log(`delete could not complete`) ; 
          console.log(action.payload) ; 
          return ; 
        }
        const {id} = action.payload ; 
        const posts = state.posts.filter(post => post.id !== id) ; 
        state.posts = posts ; 
      })
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsErrors = (state) => state.posts.error;

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id == postId);

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
