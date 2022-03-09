import { useAuth } from "../hooks/useAuth";
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useEffect } from "react";

export const Navbar = () => {
    const { login } = useAuth()
    const jwtToken = localStorage.getItem('jwtToken') //! zmienic na redux

    useEffect(() => {
        console.log(jwtToken);
    }, [jwtToken])

    return (
        <div className="bg-neutral p-2 px-10 flex">
            <h1 className="text-primary text-4xl flex-1">Skycase</h1>
            {jwtToken ? (
                <div>
                    <button className="btn btn-accent gap-2" >
                        <FaSignOutAlt size={20} />
                        <span className="text-md font-bold">Sign out</span>
                    </button>
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