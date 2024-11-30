import { createSlice } from "@reduxjs/toolkit";
const initialState={
    user:null,
    accesstoken:null,
    userdata:{},
    recieverdata:{},
    groupdata:{}
}
export const AuthSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        },
        removeuser:(state)=>{
            state.user=initialState.user;
            state.userdata=initialState.userdata;
        },
        adddata:(state,action)=>{
            state.userdata=action.payload
        },
        groupData:(state,action)=>{
            state.groupdata=action.payload
        }
    }

})
export const {setUser,adddata,removeuser,groupData} = AuthSlice.actions;
export default AuthSlice.reducer;