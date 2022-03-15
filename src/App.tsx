import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Navbar } from "./components/Navbar";
import { Profile } from "./components/Profile";
import { useAllItems } from "./hooks/useAllItems";
import { useToken } from "./hooks/useToken";
import { RootState } from "./redux/store";

export const App = () => {
  const { getToken, isReady } = useToken()
  const { getAllItems } = useAllItems()
  const steamInfo = useSelector((state: RootState) => state.user.steamInfo)
  const userInfo = useSelector((state: RootState) => state.user.userInfo)
  const isLogin = useSelector((state: RootState) => state.user.isLogin)
  const allItems = useSelector((state: RootState) => state.items.items)

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
    console.log(`isLogin`, isLogin);
    
    if(isLogin) {
      getAllItems()
    }
    
  }, [isLogin])
  
  
    useEffect(() => {
      console.log(`allItems`, allItems);
    }, [allItems])

  return (
    <BrowserRouter>
      <div className="h-screen overflow-hidden flex flex-col">
        {isReady ? (
          <>
            <Navbar />
            <div className="overflow-x-hidden bg-base-300">
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
