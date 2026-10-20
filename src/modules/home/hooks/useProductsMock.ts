import { useEffect, useState } from "react";
import { Product } from "../types";
import { getProducts } from "../api/productApi";


export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    async function loadData() {
        setLoading(true);
        try {

            const data = await getProducts(); // promise pahri dduocwj await
            setProducts(data);

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

//  useEffect(() => {
//     // Setup effect

//     return () => {
//         // Cleanup effect
//     };
//  }, [dependency]);

    useEffect(() => {
        loadData();
    }, []);

    return {
        products, 
        loading, 
        reload: loadData
    }
}