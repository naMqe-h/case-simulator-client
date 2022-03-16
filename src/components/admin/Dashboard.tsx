import { Link, useParams } from "react-router-dom"
import { CreateCase } from "./cases/CreateCase"

export const Dashboard = () => {
    const { type } = useParams()
    
    return (
        <div className="px-10 py-4">
            <div className="tabs">
                <Link to='/admin/home' className={`tab tab-bordered ${type?.toLowerCase() === 'home' && 'tab-active' } `}>Home</Link>
                <Link to='/admin/case-create' className={`tab tab-bordered ${type?.toLowerCase() === 'case-create' && 'tab-active' } `}>Create case</Link>
                <Link to='/admin/home' className="tab tab-bordered">Other</Link>
            </div>

            {type?.toLowerCase() === 'case-create' && (
                <CreateCase />
            )}


        </div>
    )
}