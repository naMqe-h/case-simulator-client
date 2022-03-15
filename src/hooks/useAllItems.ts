import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setAllItems } from "../redux/itemsSlice"
import { RootState } from "../redux/store"

export const useAllItems = () => {
    const dispatch = useDispatch()
    const token = useSelector((state: RootState) => state.user.jwtToken)

    const getAllItems = async () => {
        const headers = {
            "Authorization": 'Bearer ' + token,
        }

        const result = await axios.get('http://localhost:4000/admin/allItems', { headers })
        dispatch(setAllItems(result.data))
    }

    return { getAllItems }
}