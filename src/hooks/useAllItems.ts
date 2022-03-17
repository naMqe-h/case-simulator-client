import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setAllItems } from "../redux/itemsSlice"
import { RootState } from "../redux/store"
import { singleItem } from "../utils/Interfaces"

export const useAllItems = () => {
    const dispatch = useDispatch()
    const token = useSelector((state: RootState) => state.user.jwtToken)

    const getAllItems = async () => {
        const result = await axios.get('http://localhost:4000/admin/allItems',)
        let allItems: { [key: number]: singleItem[] } = {}
        for(let i = 0; i < Math.floor(Math.ceil(result.data.length / 200)); i++) allItems[i] = []

        let arrayIndex = 0
        result?.data?.forEach((item: singleItem, index: number) => {
            arrayIndex = Math.floor(index / 200)
            allItems[arrayIndex].push(item)
        })
        
        dispatch(setAllItems(allItems))
    }

    return { getAllItems }
}