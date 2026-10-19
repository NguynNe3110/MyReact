import { CartItem, Product } from "../../home/types";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_KEY = '@my_shopping_cart';

export const cartStorage = {
    async getCart(): Promise<CartItem[]> {
        try {
            const json = await AsyncStorage.getItem(CART_KEY);
            return json ? JSON.parse(json) : [];
        } catch (e) {
            console.error('Lỗi đọc giỏ hàng', e);
            return [];
        }
    },

    async addToCart(product: Product) : Promise<void> {
        try{
            const cart = await this.getCart();
            const existingIndex = cart.findIndex((item) => item.product.id === product.id);

            if(existingIndex > -1) {
                cart[existingIndex].quantity += 1;
            } else {
                cart.push({product, quantity: 1});
            }

            await AsyncStorage.setItem(CART_KEY ,JSON.stringify(cart));
        } catch(e) {
            console.error('Lỗi thêm giỏ hàng: ', e);
        }
    },

    async removeFromCart(productId: number) : Promise<void> {
        try {
            const cart = await this.getCart();

            const newCart = cart.filter((item) => item.product.id !== productId);
            await AsyncStorage.setItem(CART_KEY, JSON.stringify(newCart));
        } catch (error) {
            console.error('Lỗi xóa giỏ hàng', error);
        }
    },

    async clearCart() : Promise<void> {
        await AsyncStorage.removeItem(CART_KEY);
    },
}