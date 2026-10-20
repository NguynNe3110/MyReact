import { useEffect, useState } from "react";
import { ProductMock } from "../types";
import { getProductsMock } from "../api/productMockApi";


export function useProductsMock() {
    const [products, setProducts] = useState<ProductMock[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    async function loadData() {
        setLoading(true);
        try {

            const data = await getProductsMock(); // promise pahri dduocwj await
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