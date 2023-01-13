import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    mode: "dark",
    user: null,
    token: null,
    posts: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState, 
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark": "light"; 
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if(state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("No Friends");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if(post._id === action.payload.post_id) {
                    return action.payload.post
                }
                return post //Using this exit might cause a bug but we will see
            })
            state.posts = updatedPosts
        }
    }
})

export const {setMode, setLogin, setLogout, setFriends, setPost, setPosts} = authSlice.actions;

export default authSlice.reducer;