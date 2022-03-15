import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setjwtToken, setSteamUser, setUserInfo } from "../redux/userSlice";

export const useAuth = () => {
  const dispatch = useDispatch()

  const login = () => {
      const popupWindow = window.open(
        `${import.meta.env.VITE_API_URL}/auth/steam`,
        "_blank",
        "width=800, height=600",
      );
      popupWindow?.focus();
    };
  
    useEffect(() => {
      window.addEventListener("message", async (event) => {
        if (event.origin !== import.meta.env.VITE_API_URL) return;
  
        const { token, ok } = event.data;
        if (ok) {
          localStorage.setItem("jwtToken", token)

          const headers = {
            "Authorization": 'Bearer ' + token,
          }

          const steamResult = await axios.get(`${import.meta.env.VITE_API_URL}/user/steam`, { headers })
          const result = await axios.get(`${import.meta.env.VITE_API_URL}/user/info`, { headers })

          dispatch(setSteamUser(steamResult.data[0]))
          dispatch(setUserInfo(result.data[0]))
          dispatch(setjwtToken(token))
        }
      });
    }, []);

  return { login }
}