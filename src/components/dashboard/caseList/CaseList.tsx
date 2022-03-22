import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { Case } from "./Case"

export const CaseList = () => {
    const cases = useSelector((state: RootState) => state.cases.cases)
    console.log(cases);

    return (
        <div className="flex flex-wrap gap-10 mt-10">
            {cases?.map(item => (
                <Case key={item.id} item={item} />
            ))}
        </div>
    )
}