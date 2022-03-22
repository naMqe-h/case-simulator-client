import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState } from "../../redux/store"
import { singleCase } from "../../utils/Interfaces"

export const Case = () => {
    const cases = useSelector((state: RootState) => state.cases.cases)

    const [chosenCase, setChosenCase] = useState<singleCase>()

    useEffect(() => {
        id && cases.forEach(x => x.id === +id && setChosenCase(x))
    }, [])

    const { id } = useParams()

    return (
        <div className="w-full p-20 flex flex-col items-center gap-4">
            <h1 className="text-primary font-bold text-3xl">{chosenCase?.name}</h1>
            <div className="w-[1000px] h-48">a</div>
        </div>
    )
}