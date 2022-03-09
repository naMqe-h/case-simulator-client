import { useEffect } from "react";

export const useAuth = () => {

    const login = () => {
        const popupWindow = window.open(
          `${import.meta.env.VITE_API_URL}/auth/steam`,
          "_blank",
          "width=800, height=600",
        );
        popupWindow?.focus();
      };
    
      useEffect(() => {
        window.addEventListener("message", event => {
          if (event.origin !== import.meta.env.VITE_API_URL) return;
    
          const { token, ok } = event.data;
          if (ok) localStorage.setItem("jwtToken", token)
        });
      }, []);

    return { login }
}