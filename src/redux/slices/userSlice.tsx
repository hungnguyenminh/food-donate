import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Lưu trữ thông tin user ở đây
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Actions để cập nhật thông tin user
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
