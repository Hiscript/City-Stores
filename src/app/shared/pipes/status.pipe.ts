import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'status'
})
export class StatusPipe implements PipeTransform {
    transform(statusId: number): string {
        if (!statusId) {
            return '';
        }

        switch (statusId) {
            case 1:
                return 'Created';
            case 2:
                return 'Unauthorized';
            case 3:
                return 'Validated';
            case 4:
                return 'Authorized';
            case 5:
                return 'Placed';
            case 6:
                return 'Received';
            case 7:
                return 'Partial Received';
            case 10:
                return 'Completed';
            case 11:
                return 'Declined';
            case 12:
                return 'Cancelled';

            case 101:
                return 'Active';
            case 102:
                return 'Inactive';

            case 201:
                return 'Success';
            case 202:
                return 'Fail';
            case 203:
                return 'Warning';

            case 401:
                return 'In Stock';
            case 404:
                return 'Out Of Stock';
        }

        return '';
    }
}
