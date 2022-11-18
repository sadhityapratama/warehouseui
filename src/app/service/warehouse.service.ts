import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Warehouse, WarehouseResponse } from '../model/warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private warehouseUrl: string = 'http://localhost:8082/warehouse';

  constructor(private http: HttpClient) {}

  getWarehouse(): Observable<WarehouseResponse>{
    return this.http.get<WarehouseResponse>(this.warehouseUrl+'/listall');
  }

  getWarehouseDetail(id: number): Observable<Warehouse>{
    const urlByID = `${this.warehouseUrl}/${id}`
    return this.http.get<Warehouse>(urlByID)
  }

  addWarehouse(warehouse: Warehouse): Observable<Warehouse>{
    return this.http.post<Warehouse>(this.warehouseUrl, warehouse)
  }

  deleteWarehouse(id: number): Observable<Warehouse>{
    const urlByID = `${this.warehouseUrl}/${id}`
    return this.http.delete<Warehouse>(urlByID)
  }
}
