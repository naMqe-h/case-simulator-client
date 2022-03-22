import { useEffect, useState } from "react"
import { FaBuffer, FaDollarSign } from "react-icons/fa"
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { singleCase, singleItem } from "../../../utils/Interfaces"
import { SingleItem } from "./SingleItem"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const images = [
    'https://api.daddyskins.com/images/cases/background/phpCf2N3v.png',
    'https://api.daddyskins.com/images/cases/background/phpmasixU.png',
    'https://api.daddyskins.com/images/cases/background/phpRmdW22.png',
    'https://api.daddyskins.com/images/cases/background/phpfE8r7P.png',
    'https://api.daddyskins.com/images/cases/background/phpJVXfBj.png',
]

export const CreateCase = () => {
    const user = useSelector((state: RootState) => state.user.steamInfo)
    const allItems = useSelector((state: RootState) => state.items.items)
    const token = useSelector((state: RootState) => state.user.jwtToken)
    const navigate = useNavigate()

    const [itemsPage, setItemsPage] = useState(1)
    const [sumPercent, setSumPercent] = useState<number>(0)
    
    const [caseName, setCaseName] = useState('')
    const [caseImage, setCaseImage] = useState('')
    const [itemsPercent, setItemsPercent] = useState<{ [key: number]: number }>({})
    const [chosenItemsInfo, setChosenItemsInfo] = useState<singleItem[]>([])
    const [casePrice, setCasePrice] = useState<number>(0)


    const addItem = (id: number, item: singleItem) => {
        setChosenItemsInfo(prev => [...prev, item ])
    }

    const removeItem = (id: number) => {
        setChosenItemsInfo(prev => prev.filter(x => x.id !== id))
    }

    useEffect(() => {
        Object.values(itemsPercent).length > 0 && setSumPercent(Object.values(itemsPercent).reduce((a, b) => a + b))
        
        let newPrice = 0
        for(const [key, value] of Object.entries(itemsPercent)) {
            chosenItemsInfo.forEach(item => {
                if(item.id === +key) newPrice += item.price * value / 100
            })
        }
        newPrice *= 1.12
        setCasePrice(newPrice)

    }, [itemsPercent])

    const handleSubmit = async () => {
        let itemsPercentString = ''

        for (const [key, value] of Object.entries(itemsPercent)) itemsPercentString += `${key}:${value}/`

        const newCase: singleCase = {
            name: caseName,
            image: caseImage,
            items: itemsPercentString,
            price: +casePrice.toFixed(2),
            opened: 0,
            createdBy: user.steamid,
        }

        const headers = {
            "Authorization": 'Bearer ' + token,
        }

        const result = await axios.post('http://localhost:4000/case/create', newCase, { headers })
        
        result.status === 200 && toast.success('Case created successfully')
        navigate('/')

    }
    

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
                        <SingleItem item={item} removeItem={removeItem} addItem={addItem} key={item.id} />
                    ))}
                </div>
            </div>

            <div className="alert shadow-lg flex-col items-start">
                {chosenItemsInfo.map(item => (
                    <div key={item.id} className="w-full h-[80px] flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.hashName} width='90px' />
                            <h1 className="text-lg font-bold text-primary">{item.hashName}</h1>
                        </div>
                        <div className="mr-10 flex gap-16 items-center">
                            <div className="badge badge-lg badge-neutral">
                                <FaDollarSign className='text-green-500' />
                                <h1 className='text-white font-bold text-md'>
                                    {item.price.toFixed(2)}
                                </h1>
                            </div>
                            <input onChange={(e) => setItemsPercent(prev => ({ ...prev, [item.id]: +e.target.value }))} type="number" placeholder="Type %" className="input input-bordered w-[100px]" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="alert shadow-lg p-10">
                <div className="flex justify-start gap-6">
                    <h1 className="text-lg font-bold text-primary">Summary</h1>
                    <div className="badge badge-lg badge-outline text-primary">Percent sum: <span className="font-bold ml-2">{sumPercent}%</span></div>
                    <div className="badge badge-lg badge-outline text-primary gap-2">
                        <span>Case price:</span>
                        <span className="flex items-center font-bold">
                            <FaDollarSign className='text-green-500' />
                            {casePrice.toFixed(2)}
                        </span>
                    </div>
                </div>
                <button onClick={handleSubmit} className="btn btn-outline btn-success">Create case</button>
            </div>

        </div>
    )
}