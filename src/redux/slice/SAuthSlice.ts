import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isAuthenticated: false,
  isLoading: true,
  account: {
    name: "",
    phoneNumber: "",
    avatar: "",
    isVip: false,
    isBanned: false,
    role: {
      _id: null,
      name: "",
      permissions: [
        {
          name: "",
          codeName: "",
          isView: false,
          isCreate: false,
          isUpdate: false,
          isDelete: false,
        },
      ],
      version: 0,
    },
    username: "",
    address: null,
    _id: null,
    balance: 0,
    slug: null,
  },
};

export const SAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginaction: (state, action) => {
      state.isAuthenticated = true;
      state.account = action.payload;
      state.isLoading = false;
    },
    updateAccountAction: (state, action) => {
      state.account = {
        ...state.account,
        ...action.payload,
      };
    },
    getUserAction: (state, action) => {
      state.isAuthenticated = true;
      state.account = action.payload;
      state.isLoading = false;
    },
    logoutAction: (state) => {
      localStorage.removeItem("access_token");
      state.isAuthenticated = false;
      state.account = {
        slug: null,
        name: "",
        phoneNumber: "",
        avatar: "",
        isVip: false,
        isBanned: false,
        role: {
          _id: null,
          name: "",
          version: 0,
          permissions: [
            {
              name: "",
              codeName: "",
              isView: false,
              isCreate: false,
              isUpdate: false,
              isDelete: false,
            },
          ],
        },
        username: "",
        address: null,
        _id: null,
        balance: 0,
      };
    },
  },
});
export const { loginaction, getUserAction, logoutAction, updateAccountAction } =
  SAuthSlice.actions;
export default SAuthSlice.reducer;
