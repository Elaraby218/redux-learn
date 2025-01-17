import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id:'0', name:'Dude lebowski'} , 
    {id:'1', name:'Elaraby'} , 
    {id:'2', name:'Mohamed'} , 
]


const usersSlice = createSlice({
    name : "users" , 
    initialState,
    reducers:{

    }
}); 

export const selectAllUsers = (state) => state.users ; 
export default usersSlice.reducer ; 