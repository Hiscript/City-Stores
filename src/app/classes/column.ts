import { DataType } from './data-type.enum';
import { ControlType } from './control-type.enum';
import { ListItemType } from './list-item-type.enum';

export class Column {
    columnName: string;
    displayName: string;
    isFilter: boolean;
    isOptional: boolean;
    dataTypeId: DataType;
    controlTypeId: ControlType;
    listTypeId: ListItemType;
    dropdownDataId: number;
    displayOrder: number;
}
