import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Navbar } from "./components/Navbar";
import { Profile } from "./components/Profile";
import { useToken } from "./hooks/useToken";
import { RootState, store } from "./redux/store";

export const App = () => {
  const { getToken, isReady } = useToken()
  const steamInfo = useSelector((state: RootState) => state.user.steamInfo)
  const userInfo = useSelector((state: RootState) => state.user.userInfo)
  const jwtToken = useSelector((state: RootState) => state.user.jwtToken)
  const isLogin = useSelector((state: RootState) => state.user.isLogin)

  useEffect(() => {
    getToken()
  }, [])

  useEffect(() => {
    console.log(`steamInfo`, steamInfo);
  }, [steamInfo])

  useEffect(() => {
    console.log(`userInfo`, userInfo);
  }, [userInfo])

  useEffect(() => {
    console.log(`jwtToken`, jwtToken);
  }, [jwtToken])

  useEffect(() => {
    console.log(`isLogin`, isLogin);
  }, [isLogin])

  return (
    <BrowserRouter>
      <div className="w-screen overflow-hidden flex flex-col">
        {isReady ? (
          <>
            <Navbar />
            <div className="h-[800px] bg-base-300">
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/me' element={<Profile />} />
              </Routes>
            </div>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </BrowserRouter>
  )
}
