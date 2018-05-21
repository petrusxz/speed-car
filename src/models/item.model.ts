export class ItemModel {
    id?: string;
    description: string;
    picture: string = null;
    price: string;
    expirationDate: Date;
    likes: number = 0;

    constructor(values: Object = {}) {
        Object.keys(this).forEach(key => {
            if (values.hasOwnProperty(key)) this[key] = values[key];
        });
    }
}