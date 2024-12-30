import Papa from 'papaparse';
import { AddProductFormSchemaNew, addProductFormValuesNew } from '@/zod/addProduct.schema';

/**
 * Function to transform parsed CSV data into the format required by AddProductFormSchemaNew.
 *
 * @param csvData - Array of parsed product data from the CSV file.
 * @returns Transformed data in the JSON structure that matches the schema.
 */
function transformCSVToSchemaFormat(csvData: any[]): Partial<addProductFormValuesNew>[] {
    return csvData.map(product => ({
        Product: {
            ProductName: product.ProductName || "",
            SKU: product.SKU || "",
            ProductType: product.ProductType || "",
            Brand: product.Brand || "",
            ManufacturePartNumber: product.ManufacturePartNumber || "",
            ProductUPC: product.ProductUPC || "",
            GlobalTradeItemNumber: product.GlobalTradeItemNumber || "",
            CategoryID: product.CategoryID || "",
            SubCategoryID: product.SubCategoryID || "",
            StoreID: product.StoreID || "1",
            Description: product.Description || "",
            IsDropShipped: product.IsDropShipped === "true",
        },
        ProductDimensions: {
            Weight: parseFloat(product.Weight || undefined),
            Height: parseFloat(product.Height || undefined),
            Width: parseFloat(product.Width || undefined),
            Depth: parseFloat(product.Depth || undefined),
        },
        ProductTax: {
            TaxClass: product.TaxClass || "",
            TaxProviderTaxCode: product.TaxProviderTaxCode || "",
        },
        ProductInventory: {
            StockQuantity: parseFloat(product.StockQuantity || undefined),
            BinPickingNumber: product.BinPickingNumber || "",
            MinPurchaseQty: parseFloat(product.MinPurchaseQty || undefined),
            MaxPurchaseQty: parseFloat(product.MaxPurchaseQty || undefined),
        },
        ProductPricing: {
            StorePrice: parseFloat(product.StorePrice || undefined),
            SupplierPrice: parseFloat(product.SupplierPrice || undefined),
            PriceType: product.PriceType || "",
            DiscountType: product.DiscountType || "",
            Discount: parseFloat(product.Discount || undefined),
        },
        ProductShipping: {
            ShippingType: product.ShippingType || "",
            ShippingPrice: parseFloat(product.ShippingPrice || undefined),
            ShippingWeight: parseFloat(product.ShippingWeight || undefined),
            ShippingHeight: parseFloat(product.ShippingHeight || undefined),
            ShippingWidth: parseFloat(product.ShippingWidth || undefined),
            ShippingDepth: parseFloat(product.ShippingDepth || undefined),
        },
        Seo: {
            MetaTitle: product.MetaTitle || "",
            MetaDescription: product.MetaDescription || "",
            MetaKeywords: product.MetaKeywords || "",
            SearchKeywords: product.SearchKeywords || "",
        },
    }));
}

/**
 * Function to parse CSV file and transform data into schema format.
 *
 * @param file - The uploaded CSV file.
 * @returns Transformed data ready for API submission or validation.
 */
export async function getProductsJsonFromFile(file: File): Promise<Partial<addProductFormValuesNew>[]> {
    try {
        // Parse CSV data
        const csvData = await new Promise<any[]>((resolve, reject) => {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (result) => resolve(result.data),
                error: (error) => reject(error),
            });
        });

        // Transform parsed CSV data into the required format
        const transformedData = transformCSVToSchemaFormat(csvData);

        // Log or validate against schema if needed
        console.log("Transformed Data:", transformedData);

        // Optionally, validate the data using AddProductFormSchemaNew
        // transformedData.forEach(data => {
        //     AddProductFormSchemaNew.parse(data); // Will throw if validation fails
        // });

        return transformedData;
    } catch (error) {
        console.error("Error processing CSV file:", error);
        throw error;
    }
}
