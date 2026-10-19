import { useCallback, useState } from "react";
import { CartItem } from "../../home/types";
import { cartStorage } from "../storage/cartStorage";
import { useFocusEffect } from "@react-navigation/native";


export default function useCart() {
    const [items, setItems] = useState<CartItem[]>([]);
    const[loading, setLoading] = useState<boolean>(false);

    // setup casc function

    const loadCart = useCallback(async () => {
        setLoading(true);
        const data = await cartStorage.getCart();
        setItems(data);
        setLoading(false);
    }, []);

    // moi khi nhan vao tab cart la se chay
    useFocusEffect(
        useCallback(() => {
            loadCart();

        }, [loadCart])
    );

    const removeItem = async(productId: number) => {
        await cartStorage.removeFromCart(productId);
        await loadCart();
    }

    const totalPrice = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return {
        items, 
        loading, 
        removeItem, 
        totalPrice, 
    };
}