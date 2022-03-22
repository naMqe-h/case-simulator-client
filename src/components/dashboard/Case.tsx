import { FaDollarSign } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { singleCase } from "../../utils/Interfaces"

type CaseProps = {
    item: singleCase
}

export const Case: React.FC<CaseProps> = ({ item }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/case/${item.id}`)
        console.log(item.id);
    }

    return (
        <div onClick={handleClick} className="w-64 h-64 bg-base-100 shadow-xl p-4 relative cursor-pointer" style={{ borderRadius: '20px' }}>
            <h1 className="text-primary text-2xl text-center font-bold">{item.name}</h1>
            <div className="flex justify-center">
                <img src={item.image} alt={item.name} className='w-48' />
            </div>
            <div className="w-full text-white font-bold text-lg gap-2 flex justify-center absolute bottom-3 right-0 left-0">
                Open 
                <span className="flex items-center">
                    <FaDollarSign className='text-green-500' size={16} />
                    {item.price}
                </span>
            </div>
        </div>
    )
}