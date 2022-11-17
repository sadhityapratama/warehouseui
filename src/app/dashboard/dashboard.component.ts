import { Component } from '@angular/core';
import { Asset } from '../model/asset';
import { AssetService } from '../service/asset.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  asset: Asset[] = [];

  constructor(private assetService: AssetService, private location: Location) { }

  ngOnInit(): void {
    this.asset = []
    this.getAsset()
  }

  getAsset(): void {
    this.assetService.getAsset()
      .subscribe(asset => this.asset = asset);
  }
}
