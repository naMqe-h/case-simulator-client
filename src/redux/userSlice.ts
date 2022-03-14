import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface userSliceInterface {
    steamInfo: {
        steamid: string
        nickname: string
        profileurl: string
        avatar: string
        avatarmedium: string
        avatarfull: string
        firstLogin: string
    }
    userInfo: {
        balance: number
        email: string | null
        id: number
        openedCases: number
        premium: number
        premiumEndDate: string | null
        role: number
        score: number
        steamid: string
        tokens: number
        tradeUrl: string | null
    },
    jwtToken: string | null,
    isLogin: boolean
}

const initialState: userSliceInterface = {
    steamInfo: {
        steamid: '',
        nickname: '',
        profileurl: '',
        avatar: '',
        avatarmedium: '',
        avatarfull: '',
        firstLogin: '',
    },
    userInfo: {
        balance: 0,
        email: null,
        id: 0,
        openedCases: 0,
        premium: 0,
        premiumEndDate: null,
        role: 0,
        score: 0,
        steamid: '',
        tokens: 0,
        tradeUrl: null
    },
    jwtToken: localStorage.getItem('jwtToken'),
    isLogin: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSteamUser: (state, action) => {
            state.steamInfo = action.payload
            state.isLogin = true
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
        setjwtToken: (state, action) => {
            state.jwtToken = action.payload
        },
        logout: (state) => {
            state.isLogin = false
            state.jwtToken = null
            state.steamInfo = initialState.steamInfo
            state.userInfo = initialState.userInfo
        }
    }
})

export const { setSteamUser, setUserInfo, setjwtToken, logout } = userSlice.actions
export const selectUser = (a: RootState) => a
export default userSlice.reducer