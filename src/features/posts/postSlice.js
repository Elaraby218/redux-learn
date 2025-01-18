import { createSlice, nanoid } from "@reduxjs/toolkit";
import {sub} from 'date-fns'


const initialState= [
    {
        id:'1' , 
        title:'Learn Redux' , 
        content: '6 chasdfasdfasdfasdfapters' ,
        date: sub(new Date(), {minutes:10}).toISOString() , 
        reactions: {
            thumbsUp:0, 
            wow : 0 , 
            heart: 0 , 
            rocket: 0 , 
            coffee: 0 
        }

    } ,

    {
        id:'2' , 
        title:'Learn Tailwind' , 
        content: '10 chapters',
        date: sub(new Date(), {minutes:5}).toISOString() ,
        reactions: {
            thumbsUp:0, 
            wow : 0 , 
            heart: 0 , 
            rocket: 0 , 
            coffee: 0 
        }
    
    } , 
]

export const postsSlice = createSlice({
    name:"posts" , 
    initialState , 
    reducers : {
        // postAdded(state,action){
        //     state.push(action.payload) ;
        // } , 

        postAdded : {
            reducer(state,action){
                state.push(action.payload) ;
            },
            prepare(title,content,userId){
                return {
                    payload : {
                        id : nanoid() , 
                        title , 
                        content,
                        date : new Date().toISOString() , 
                        userId , 
                        reactions: {
                            thumbsUp:0, 
                            wow : 0 , 
                            heart: 0 , 
                            rocket: 0 , 
                            coffee: 0 
                        }
                    }
                }
            }
        } , 

        reactionAdded(state,action){
            const {postId , reaction} = action.payload ;
            const existingPost = state.find(post => post.id === postId)
            if(existingPost){
                existingPost.reactions[reaction]++ ; 
            }
        }

    }

});


export const selectAllPosts = (state) => state.posts ;

export const {postAdded , reactionAdded} = postsSlice.actions ; 

export default postsSlice.reducer ; 