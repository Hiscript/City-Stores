export class ChangeOrder {
    from: number;
    to: number;
    parentId: number;

    constructor(from: number, to: number, parentId: number = null) {
        this.from = from;
        this.to = to;
        this.parentId = parentId;
    }
}
