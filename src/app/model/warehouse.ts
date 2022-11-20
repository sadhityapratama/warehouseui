export interface Warehouse {
    id: number;
    warehouseName: string;
    warehouseLocation: string;
    warehouseCapacity: number;
  }
  
export interface WarehouseBulkResponse {
    status: number;
    message: string;
    object: Warehouse[];
}
export interface WarehouseResponse {
  status: number;
  message: string;
  object: Warehouse;
}
  