import { CategoryAttributeItem } from './category-attribute-item';
import { AttributeType } from './attribute-type.enum';

export class CategoryAttribute {
    categoryAttributeId: number;
    attributeName: string;
    attributeType: AttributeType;
    parentId: number;
    displayOrder: number;
    items: CategoryAttributeItem[];

    childAttributes: CategoryAttribute[];
}
