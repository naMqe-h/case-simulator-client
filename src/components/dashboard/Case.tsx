import { FaDollarSign } from "react-icons/fa"

type CaseProps = {
    image: string
}

export const Case: React.FC<CaseProps> = ({ image }) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure>
                <img src={image} alt="Case" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Case #1</h2>
                <div className="card-actions absolute bottom-10 right-10">
                    <button className="btn btn-primary btn-outline font-bold">
                        Buy <FaDollarSign fill="green" size={18}  /> 15.00
                    </button>
                </div>
            </div>
        </div>
    )
}