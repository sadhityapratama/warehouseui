import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Asset, AssetResponse } from '../model/asset';
import { AssetService } from '../service/asset.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent {

  assetResponse!: AssetResponse;
  assets: Asset[] = [];

  constructor(
    private assetService: AssetService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getAsset()
    console.log(this.assets)
  }

  getAsset(): void {
    this.assetService.getAsset()
      .subscribe(assets => {
        this.assets = assets.object
      });
  }
}
