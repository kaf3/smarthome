export interface IEquip {
    name: string;
    mac?: string;
    value: string | number | boolean;
    type: string;
    group: string;
    update?: Date;
    id: string;
    location: string;
}