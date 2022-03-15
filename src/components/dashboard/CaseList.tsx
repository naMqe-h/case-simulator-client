import { Case } from "./Case"
import { RootState } from "../../redux/store"
import { useSelector } from "react-redux"

export const CaseList = () => {
    const allItems = useSelector((state: RootState) => state.items.items)
    return (
        <div className="flex flex-wrap gap-10 mt-10">
            {allItems && allItems.map((item, i) => (
                <Case key={i} item={item} />
            ))}
        </div>
    )
}