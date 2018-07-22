import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'grouping'
})
export class GroupFilterPipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any {
        return items.filter(item => item[field] === value);
    }
}
