import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    theme: 'light'
}

let themeSlice = createSlice({
    name: 'theme', initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'
        }
    }
})

export let {toggleTheme} = themeSlice.actions

export default themeSlice.reducer;



