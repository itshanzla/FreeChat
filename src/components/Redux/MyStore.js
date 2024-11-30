import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import ThemeSlice from "./ThemeSlice";
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";


let PersistConfig={
    key:'root',
    storage:AsyncStorage
}
let rootReducer=combineReducers({
    // theme:ThemeSlice,
    user:AuthSlice
})
let PersistedReducer=persistReducer(PersistConfig,rootReducer);
const MyStore=configureStore({
    reducer:PersistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                ignoreActions:[FLUSH,REHYDRATE,PAUSE,PURGE,REGISTER,PERSIST]
            },
        }),
});
export default MyStore