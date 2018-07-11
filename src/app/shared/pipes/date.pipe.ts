import { Pipe } from '@angular/core';
import { DatePipe } from "@angular/common";

@Pipe({
    name: 'dateString'
})
export class DateStringPipe extends DatePipe {
    transform(value: any): string {
        if (!value)
            return '';

        let date: Date = new Date(value);
        return super.transform(date, 'dd-MM-yyyy');
    }
} 