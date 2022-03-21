import { Dispatch, SetStateAction, useState } from 'react'
import { FaDollarSign } from 'react-icons/fa'
import { singleItem } from '../../../utils/Interfaces'

interface SingleItemProps {
    item: singleItem
    addItem: (id: number, item: singleItem) => void
    removeItem: (id: number) => void
}

export const SingleItem: React.FC<SingleItemProps> = ({ item, addItem, removeItem }) => {
    const newBorder = item.borderColor[0] !== "#" ? `#${item.borderColor}` : item.borderColor
    const [isAdded, setIsAdded] = useState<boolean>(false)

    const style = {
        borderTop: `3px solid ${newBorder}`
    }

    const handleAdd = () => {
        !isAdded && addItem(item.id, item)
        isAdded && removeItem(item.id)
        setIsAdded(prev => !prev)

    }

    return (
        <div onClick={handleAdd} className={`w-[200px] h-[200px] bg-base-300 mx-1 relative overflow-hidden`} style={style} >
            <img src={item.image} alt={item.hashName} className='w-full' />
            <div className="absolute top-0 right-0  flex items-center">
                <FaDollarSign className='text-green-500' />
                <h1 className='text-white font-bold text-md'>
                    {item.price}
                </h1>
            </div>
            <div className="absolute bottom-2 h-16 px-3">
                <h2 className='text-primary font-bold'>{item.hashName.split('(')[0]}</h2>
                <h2 className='text-gray-500 font-bo'>({item.hashName.split('(')[1]}</h2>
            </div>
        </div>
    )
}