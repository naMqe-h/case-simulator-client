export interface singleItem {
    id: number
    name: string
    hashName: string
    borderColor: string
    image: string
    price: number
    priceMin: number
    priceAvg: number
    priveMax: number
    updatedAt: string
}

export interface singleCase {
    id?: number
    name: string
    image: string
    items: string
    price: number
    opened: number
    createdBy: string
}