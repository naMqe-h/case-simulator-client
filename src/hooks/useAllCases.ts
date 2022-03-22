import axios from "axios"
import { useDispatch } from "react-redux"
import { setAllCases } from "../redux/casesSlice"

export const useAllCases = () => {
    const dispatch = useDispatch()

    const getAllCases = async () => {
        const result = await axios.get('http://localhost:4000/case/allCases',)

        dispatch(setAllCases(result.data))
    }

    return { getAllCases }
}