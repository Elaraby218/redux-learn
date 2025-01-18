import { createSlice, nanoid } from "@reduxjs/toolkit";
import {sub} from 'date-fns'


const initialState= [
    {
        id:'1' , 
        title:'Learn Redux' , 
        content: '6 chasdfasdfasdfasdfapters' ,
        date: sub(new Date(), {minutes:10}).toISOString() , 
    } ,

    {
        id:'2' , 
        title:'Learn Tailwind' , 
        content: '10 chapters',
        date: sub(new Date(), {minutes:5}).toISOString() ,
    
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
                    }
                }
            }
        }

    }

});


export const selectAllPosts = (state) => state.posts ;

export const {postAdded} = postsSlice.actions ; 

export default postsSlice.reducer ; 