import { FaDollarSign } from "react-icons/fa"
import { singleItem } from "../../utils/Interfaces"

type CaseProps = {
    item: singleItem
}

export const Case: React.FC<CaseProps> = ({ item }) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure>
                <img src={item.image} alt="Case" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{item.hashName}</h2>
                <div className="card-actions absolute bottom-10 right-10">
                    <button className="btn btn-primary btn-outline font-bold">
                        Buy <FaDollarSign fill="green" size={18} /> {item.price}
                    </button>
                </div>
            </div>
        </div>
    )
}