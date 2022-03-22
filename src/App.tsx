import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Dashboard as AdminDashboard } from "./components/admin/Dashboard";
import { Navbar } from "./components/Navbar";
import { Profile } from "./components/Profile/Profile";
import { useAllItems } from "./hooks/useAllItems";
import { useToken } from "./hooks/useToken";
import { RootState } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAllCases } from "./hooks/useAllCases";
import { Case } from "./components/case/Case";

export const App = () => {
  const { getToken, isReady } = useToken()
  const { getAllItems } = useAllItems()
  const { getAllCases } = useAllCases()
  const steamInfo = useSelector((state: RootState) => state.user.steamInfo)
  const userInfo = useSelector((state: RootState) => state.user.userInfo)
  const isLogin = useSelector((state: RootState) => state.user.isLogin)
  const allItems = useSelector((state: RootState) => state.items.items)

  useEffect(() => {
    getToken()
    getAllItems()
    getAllCases()
  }, [])

  useEffect(() => {
    console.log(`userInfo`, userInfo);
  }, [userInfo])
  
    // useEffect(() => {
    //   console.log(`allItems`, allItems);
    // }, [allItems])

  return (
    <BrowserRouter>
      <div className="h-screen overflow-hidden flex flex-col">
        {isReady ? (
          <>
            <Navbar />
            <div className="overflow-x-hidden bg-base-300 h-screen">
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/me' element={<Profile />} />
                <Route path='/admin/:type' element={<AdminDashboard />} />
                <Route path='/case/:id' element={<Case /> } />
              </Routes>
            </div>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <ToastContainer
          position="bottom-left"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    </BrowserRouter>
  )
}
