import { useAuth } from "../hooks/useAuth";
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaDollarSign, FaSignInAlt, FaSignOutAlt, FaSteamSymbol } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/userSlice";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const { login } = useAuth()
    const dispatch = useDispatch()
    const isLogin = useSelector((state: RootState) => state.user.isLogin)
    const steamInfo = useSelector((state: RootState) => state.user.steamInfo)
    const userInfo = useSelector((state: RootState) => state.user.userInfo)

    const handleLogout = () => {
        localStorage.removeItem('jwtToken')
        dispatch(logout())
    }

    return (
        <div className="bg-neutral p-2 pl-7 h-[70px] flex">
            <Link to='/'>
                <h1 className="text-primary text-4xl">
                    Skycase
                </h1>
            </Link>
            <div className="flex-1"></div>
            {isLogin ? (
                <div className="flex">
                    <div className="flex items-center gap-5">
                        <p className="flex items-center font-bold text-2xl">
                            <FaDollarSign fill="green" size={22}  />
                            <span className="text-white">{userInfo?.balance?.toFixed(2)}</span>
                        </p>
                        <Link to='/me'>
                            <div className="avatar pt-1">
                                <div className="w-10 rounded-full">
                                    <img src={steamInfo?.avatarmedium} />
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn m-1">
                            <GiHamburgerMenu size={24} />
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link to='/me'>
                                    <div className="flex items-center gap-2">
                                        <FaSteamSymbol size={20} /> 
                                        <h1 className="text-primary font-bold">{steamInfo?.nickname}</h1>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to='/settings'>
                                    <div className="flex items-center gap-2">
                                        <FiSettings size={20} /> 
                                        <h1 className="text-primary font-bold">Settings</h1>
                                    </div>
                                </Link>
                            </li>
                            {userInfo.role === 99 && (
                                <>
                                    <li className="divider"></li>
                                    <li>
                                        <Link to='/admin/home'>
                                            <div className="flex items-center gap-2">
                                                <FiSettings size={20} /> 
                                                <h1 className="text-primary font-bold">Admin panel</h1>
                                            </div>
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li className="divider"></li>
                            <li>
                                <button onClick={handleLogout} className='text-primary opacity-80' >
                                    <FaSignOutAlt size={20} />
                                    <span className="text-md font-bold">Sign out</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div>
                    <button onClick={login} className="btn btn-accent gap-2" >
                        <FaSignInAlt size={20} />
                        <span className="text-md font-bold">Sign in</span>
                    </button>
                </div>
            )}
        </div>
    )
}