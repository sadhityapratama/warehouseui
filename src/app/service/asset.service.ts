import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Asset } from '../model/asset';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private assetUrl: string = 'http://localhost:3005/object';

  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  }

  getAsset(): Observable<Asset[]>{
    return this.http.get<Asset[]>(this.assetUrl);
  }

  getAssetDetail(barcode: string): Observable<Asset>{
    const urlByID = `${this.assetUrl}/${barcode}`
    return this.http.get<Asset>(urlByID) // 
  }

  addAssetService(asset: Asset): Observable<Asset>{
    return this.http.post<Asset>(this.assetUrl, asset, this.httpOptions)
  }

  deleteAssetService(barcode: string): Observable<Asset>{
    const urlByID = `${this.assetUrl}/${barcode}`
    return this.http.delete<Asset>(urlByID)
  }
}
