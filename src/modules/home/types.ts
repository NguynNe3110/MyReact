export type ProductMock = {
    id: number;
    name: string;
    price: number;
    desctiption: string;
}

export type CartItem = {
    product: ProductMock;
    quantity: number;
}