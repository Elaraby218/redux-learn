import { createSlice, nanoid } from "@reduxjs/toolkit";



const initialState= [
    {id:'1' , title:'Learn Redux' , content: '6 chasdfasdfasdfasdfapters'} ,
    {id:'2' , title:'Learn Tailwind' , content: '10 chapters'} , 
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
                        userId 
                    }
                }
            }
        }

    }

});


export const selectAllPosts = (state) => state.posts ;

export const {postAdded} = postsSlice.actions ; 

export default postsSlice.reducer ; 