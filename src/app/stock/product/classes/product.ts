import { TrackingType } from './tracking-type.enum';
import { ProductStatus } from './product-status.enum';

export class Product {
    productId: number;
    categoryId: number;
    sku: string;
    productName: string;
    imageURL: string;
    minQuantity: number;
    maxQuantity: number;
    trackingType: TrackingType;
    measurementUnitId: number;
    weightCategoryId: number;
    description: string;
    status: ProductStatus;
}
