import { Product } from "../types";


export async function getProducts(): Promise<Product[]> { // promise có 3 trạng thái, pending, fullilled, rejected 
    return new Promise((resolve) => { // resolve là hàm thông báo kết quả cho promise 
        setTimeout(() => resolve(MOCK_PRODUCTS), 500);
    })
}

export async function getProductById(id: number): Promise<Product | undefined> {
    return new Promise((resolve, _) => { // promise trả về 2 hàm resolve khi thành công và reject khi error
        setTimeout(() => {
            const found = MOCK_PRODUCTS.find((p) => p.id===id);
            resolve(found)
        }, 300);
    });
    
}


const MOCK_PRODUCTS: Product[] = [
    {
        id: 1, 
        name: 'Iphone 15 ProMax',
        price: 1200, 
        desctiption: 'Khung viền titan cao cấp, chip mạnh, camera ngon luôn'

    },
        {
        id: 2, 
        name: 'Iphone 15 ProMax',
        price: 1200, 
        desctiption: 'Khung viền titan cao cấp, chip mạnh, camera ngon luôn'

    },
        {
        id: 3, 
        name: 'Iphone 15 ProMax',
        price: 1200, 
        desctiption: 'Khung viền titan cao cấp, chip mạnh, camera ngon luôn'

    },
        {
        id: 4, 
        name: 'Iphone 15 ProMax',
        price: 1200, 
        desctiption: 'Khung viền titan cao cấp, chip mạnh, camera ngon luôn'

    },
        {
        id: 5, 
        name: 'Iphone 15 ProMax',
        price: 1200, 
        desctiption: 'Khung viền titan cao cấp, chip mạnh, camera ngon luôn'

    },
        {
        id: 6, 
        name: 'Iphone 15 ProMax',
        price: 1200, 
        desctiption: 'Khung viền titan cao cấp, chip mạnh, camera ngon luôn'

    },
        {
        id: 7, 
        name: 'Iphone 15 ProMax',
        price: 1200, 
        desctiption: 'Khung viền titan cao cấp, chip mạnh, camera ngon luôn'
    },
            {
        id: 8, 
        name: 'Iphone 15 ProMax',
        price: 1200, 
        desctiption: 'Khung viền titan cao cấp, chip mạnh, camera ngon luôn'
    },
            {
        id: 9, 
        name: 'Iphone 15 ProMax',
        price: 1200, 
        desctiption: 'Khung viền titan cao cấp, chip mạnh, camera ngon luôn'
    },
            {
        id: 10, 
        name: 'Iphone 15 ProMax',
        price: 1200, 
        desctiption: 'Khung viền titan cao cấp, chip mạnh, camera ngon luôn'
    },
            {
        id: 11, 
        name: 'Iphone 15 ProMax',
        price: 1200, 
        desctiption: 'Khung viền titan cao cấp, chip mạnh, camera ngon luôn'
    },
            {
        id: 12, 
        name: 'Iphone 15 ProMax',
        price: 1200, 
        desctiption: 'Khung viền titan cao cấp, chip mạnh, camera ngon luôn'
    },

]