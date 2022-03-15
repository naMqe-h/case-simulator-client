import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { logout, setjwtToken, setSteamUser, setUserInfo } from "../redux/userSlice"

export const useToken = () => {
    const dispatch = useDispatch()
    const [isReady, setIsReady] = useState<boolean>(true)

    const getToken = async () => {
        setIsReady(false)
        const tempToken = localStorage.getItem("jwtToken")

        if(tempToken) {
            dispatch(setjwtToken(tempToken))
            const headers = {
                "Authorization": 'Bearer ' + tempToken,
            }
    
            const steamResult = await axios.get(`${import.meta.env.VITE_API_URL}/user/steam`, { headers })
            const result = await axios.get(`${import.meta.env.VITE_API_URL}/user/info`, { headers })

            if(result.data.error || steamResult.data.error ) {
                localStorage.removeItem('jwtToken')
                dispatch(logout)
            } else {
                dispatch(setSteamUser(steamResult.data[0]))
                dispatch(setUserInfo(result.data[0]))
            }

            setIsReady(true)
        } else {
            setIsReady(true)
        }
    }

    return { getToken, isReady }
}