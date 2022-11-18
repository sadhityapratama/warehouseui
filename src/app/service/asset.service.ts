import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Asset, AssetResponse } from '../model/asset';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  isLoggedIn = false;

  private assetUrl: string = 'http://localhost:8082/asset';

  constructor(private http: HttpClient) {}

  getAsset(): Observable<AssetResponse>{
    console.log(this.assetUrl+'/listall')
    return this.http.get<AssetResponse>(this.assetUrl+'/listall');
  }

  getAssetDetail(barcode: string): Observable<Asset>{
    const urlByID = `${this.assetUrl}/${barcode}`
    return this.http.get<Asset>(urlByID)
  }

  addAsset(asset: Asset): Observable<Asset>{
    return this.http.post<Asset>(this.assetUrl, asset)
  }

  deleteAsset(barcode: string): Observable<Asset>{
    const urlByID = `${this.assetUrl}/${barcode}`
    return this.http.delete<Asset>(urlByID)
  }
}
