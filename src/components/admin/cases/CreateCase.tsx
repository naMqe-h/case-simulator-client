import { useEffect, useState } from "react"
import { FaBuffer } from "react-icons/fa"
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { SingleItem } from "./SingleItem"

const images = [
    'https://api.daddyskins.com/images/cases/background/phpCf2N3v.png',
    'https://api.daddyskins.com/images/cases/background/phpmasixU.png',
    'https://api.daddyskins.com/images/cases/background/phpRmdW22.png',
    'https://api.daddyskins.com/images/cases/background/phpfE8r7P.png',
    'https://api.daddyskins.com/images/cases/background/phpJVXfBj.png',
]

export const CreateCase = () => {
    const allItems = useSelector((state: RootState) => state.items.items)
    const [caseName, setCaseName] = useState('')
    const [caseImage, setCaseImage] = useState('')
    const [itemsPage, setItemsPage] = useState(1)

    return (
        <div className="flex flex-col gap-8 mt-4">
            <div className="flex justify-center items-center gap-2">
                <FaBuffer size={32} />
                <span className="text-3xl font-bold text-primary">Create new case</span>
            </div>

            <div className="alert shadow-lg px-10">
                <div className="flex flex-col w-full items-start gap-4">
                    <div className="flex items-center gap-2">
                        <MdOutlineDriveFileRenameOutline size={26} />
                        <span className="text-2xl font-bold text-primary">Case name</span>
                    </div>
                    <div className="w-full">
                        <input type="text" value={caseName} onChange={(e) => setCaseName(e.currentTarget.value)} placeholder="Type here name of case" className="input input-bordered w-full" />
                    </div>
                </div>
            </div>

            <div className="alert shadow-lg px-10">
                {images.map(item => (
                    <div key={item} className="w-[280px]">
                        <img src={item} onClick={() => setCaseImage(item)} className={`w-full ${item === caseImage && 'border-b-2'} `} />
                    </div>
                ))}
            </div>

            <div className="alert shadow-lg px-10 h-[800px] overflow-y-hidden items-start flex-col">
                <div className="flex w-full h-[60px]">
                    <div className="btn-group">
                        {itemsPage === 1 ? (
                            <button disabled className="btn">«</button>
                            ) : (
                            <button onClick={() => setItemsPage(prev => prev - 1)} className="btn">«</button>
                        )}
                        <button className="btn">Page {itemsPage}</button>
                        {itemsPage === (Object.values(allItems).length - 1) ? (
                            <button disabled className="btn">»</button>
                            ) : (
                            <button onClick={() => setItemsPage(prev => prev + 1)} className="btn">»</button>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap h-[740px] overflow-y-scroll">
                    {allItems[itemsPage-1]?.map(item => (
                        <SingleItem item={item} key={item.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}