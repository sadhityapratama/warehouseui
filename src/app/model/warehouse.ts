export interface Warehouse {
    id: number;
    warehouseName: string;
    warehouseLocation: string;
    warehouseCapacity: number;
  }
  
  export interface WarehouseResponse {
    status: number;
    message: string;
    object: Warehouse[];
  }
  