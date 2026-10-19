export type Product = {
    id: number;
    name: string;
    price: number;
    desctiption: string;
}

export type CartItem = {
    product: Product;
    quantity: number;
}