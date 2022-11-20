import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockResponse } from '../model/stock';
import { Warehouse, WarehouseBulkResponse, WarehouseResponse } from '../model/warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private warehouseUrl: string = 'http://localhost:8082/warehouse';

  constructor(private http: HttpClient) {}

  getWarehouse(): Observable<WarehouseBulkResponse>{
    return this.http.get<WarehouseBulkResponse>(this.warehouseUrl+'/listall');
  }

  getWarehouseDetailStock(id: number): Observable<StockResponse>{
    const urlByID = `${this.warehouseUrl}/liststock?id=${id}`
    return this.http.get<StockResponse>(urlByID)
  }

  addWarehouse(warehouse: Warehouse): Observable<WarehouseResponse>{
    // console.log(warehouse)
    return this.http.post<WarehouseResponse>(this.warehouseUrl+'/add', warehouse)
  }

  editWarehouse(warehouse: Warehouse): Observable<WarehouseResponse>{
    // console.log(warehouse)
    return this.http.put<WarehouseResponse>(this.warehouseUrl+'/update', warehouse)
  }

  deleteWarehouse(id: number): Observable<WarehouseResponse>{
    const urlByID = `${this.warehouseUrl}/delete?id=${id}`
    return this.http.delete<WarehouseResponse>(urlByID)
  }
}
