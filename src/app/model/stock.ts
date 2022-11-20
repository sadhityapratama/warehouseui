import { Asset } from "./asset";
import { Warehouse } from "./warehouse";

export interface Stock{
    assets: Asset;
    warehouse: Warehouse;
    stock: number;
}

export interface StockResponse{
    status: number;
    message: string;
    object: Stock[];
}