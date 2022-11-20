import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Asset, AssetBulkResponse, AssetResponse } from '../model/asset';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  isLoggedIn = false;

  private assetUrl: string = 'http://localhost:8082/asset';

  constructor(private http: HttpClient) {}

  getAsset(): Observable<AssetBulkResponse>{
    console.log(this.assetUrl+'/listall')
    return this.http.get<AssetBulkResponse>(this.assetUrl+'/listall');
  }

  // getWarehouseDetailStock(id: number): Observable<AssetResponse>{
  //   const urlByID = `${this.assetUrl}/liststock?id=${id}`
  //   return this.http.get<AssetResponse>(urlByID)
  // }

  addWarehouse(asset: Asset): Observable<AssetResponse>{
    // console.log(warehouse)
    return this.http.post<AssetResponse>(this.assetUrl+'/add', asset)
  }

  editWarehouse(asset: Asset): Observable<AssetResponse>{
    // console.log(warehouse)
    return this.http.put<AssetResponse>(this.assetUrl+'/update', asset)
  }

  deleteWarehouse(barcode: string): Observable<AssetResponse>{
    const urlByID = `${this.assetUrl}/delete?barcode=${barcode}`
    return this.http.delete<AssetResponse>(urlByID)
  }
}
