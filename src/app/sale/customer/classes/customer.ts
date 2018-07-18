import { CustomerStatus } from './customer-status.enum';

export class Customer {
    customerId: number;
    customerNo: string;
    customerName: string;
    imageURL: string;
    mobile: string;
    email: string;
    gstNo: string;
    note: string;
    status: CustomerStatus;
}
