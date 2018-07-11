import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
    name: 'currencyString'
})
export class CurrencyStringPipe extends DecimalPipe implements PipeTransform {
    transform(value: any): string {
        if (!value || value === undefined) {
            return '';
        }
        value = super.transform(value, '1.2-4');

        if (value.charAt(0) === '-') {
            return '- ₹' + value.substring(1, value.length);
        }
        return '₹' + value;
    }
}
