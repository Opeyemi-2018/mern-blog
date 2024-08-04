import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    currentUser: null, error: null, loading: false
}

let userSlice = createSlice({
    name: 'user', 
    initialState,
    reducers: {
        // sign in
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
        },
        
        // update
        updateStart: (state) => {
            state.loading = true;
            state.error = null;
          },
          updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
          },
          updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
        //   delete
          deleteUserStart: (state) => {
            state.loading = true;
            state.error = null;
          },
          deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
          },
          deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
        //  sign out 
        signoutSuccess: (state) => {
          state.currentUser = null;
          state.error = null;
          state.loading = false;
        },
    }
})

export let {signInStart, signInSuccess, signInFailure, updateStart, updateSuccess, updateFailure,
    deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutSuccess
} = userSlice.actions

export default userSlice.reducer