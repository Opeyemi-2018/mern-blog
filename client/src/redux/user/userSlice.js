import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    currentUser: null, error: null, loading: false
}

let userSlice = createSlice({
    name: 'user', 
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
            state.error = null
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = false
        },
        signInFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export let {signInStart, signInSuccess, signInFailure} = userSlice.actions

export default userSlice.reducer