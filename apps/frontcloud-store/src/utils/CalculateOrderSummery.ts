import { CartItem } from "@/Redux/api/user/types/cart.types";

interface OrderSummary {
    price: number; // Total price of all items
    discount: number; // Total discount on all items
    deliveryCharges: number; // Delivery charges (assume free in this example)
    packagingFee: number; // Fixed packaging fee
    totalAmount: number; // Final total after applying discount and charges
    savings: number; // Total savings
}

export function calculateOrderSummary(cartItems: CartItem[], packagingFee: number = 99): OrderSummary {
    let price = 0;
    let discount = 0;

    cartItems.forEach((item) => {
        const itemTotalPrice = parseFloat(item.Price) * item.Quantity;
        const itemDiscount = parseFloat(item.Discount) * item.Quantity;
        price += itemTotalPrice;
        discount += itemDiscount;
    });

    const deliveryCharges = 0; // Assume free delivery
    const totalAmount = price - discount + packagingFee + deliveryCharges;
    const savings = discount; // Savings are equal to the total discount

    return {
        price,
        discount,
        deliveryCharges,
        packagingFee,
        totalAmount,
        savings,
    };
}
