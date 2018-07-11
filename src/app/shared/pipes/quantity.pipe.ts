import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
    name: 'quantityString'
})
export class QuantityStringPipe extends DecimalPipe implements PipeTransform {
    transform(value: any): string {
        if (!value) {
            return '';
        }

        return super.transform(value, '1.0-2');
    }
}
