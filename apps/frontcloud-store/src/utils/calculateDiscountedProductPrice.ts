
export function calculateDiscountedPrice(storePrice: number, discountType: string | null | undefined, discount: number | null | undefined): number {
    if (!discountType || discount === null || discount === undefined) return storePrice;

    switch (discountType) {
        case 'percentage':
            return storePrice - (storePrice * discount) / 100;
        case 'fixed':
            return Math.max(0, storePrice - discount);
        case 'unit':
            return storePrice - discount; // Assuming "unit" applies directly like "fixed"
        default:
            return storePrice;
    }
}
