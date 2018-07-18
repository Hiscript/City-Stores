import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'datetimeString'
})
export class DateTimeStringPipe extends DatePipe implements PipeTransform {
    transform(value: any): string {
        if (!value) {
            return '';
        }

        const date: Date = new Date(value);
        return super.transform(date, 'dd-MM-yyyy HH:mm');
    }
}
