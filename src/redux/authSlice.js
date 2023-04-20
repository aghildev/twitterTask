import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    password: ''
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    clearCredentials: (state) => {
      state.username = ''
      state.password = ''
    }
  }
})

export const { setUsername, setPassword, clearCredentials } = authSlice.actions

export default authSlice.reducer
