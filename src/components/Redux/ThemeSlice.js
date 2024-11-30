import {createSlice} from '@reduxjs/toolkit'
import DARK from '../../Themes/Dark.json'
import LIGHT from '../../Themes/Light.json'


export const ThemeSlice=createSlice({
    name:'theme',
    initialState:{mode:LIGHT},
    reducers:{
        toggleTheme:state=>{
            state.mode=state.mode.mode==='light' ? DARK :LIGHT;
        }
    }
});
export const {toggleTheme} =ThemeSlice.actions;
export default ThemeSlice.reducer;