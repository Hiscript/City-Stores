import { AttributeType } from '../../category/classes/attribute-type.enum';

export class ProductAttribute {
    productAttributeId: number;
    categoryAttributeId: number;
    attributeValue: string;

    attributeName: string;
    attributeType: AttributeType;
    childAttributes: ProductAttribute[];
}
