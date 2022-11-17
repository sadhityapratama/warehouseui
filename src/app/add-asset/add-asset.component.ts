import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Asset,AssetModel } from '../model/asset';
import { AssetService } from '../service/asset.service';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent {

  constructor(private assetService: AssetService,private location: Location) { }

  modelAsset = new AssetModel('','','')
  asset: Asset[] = [];

  ngOnInit(): void {
    this.asset = []
  }

  goBack(): void {
    this.location.back()
  }

  onSubmit(){
    this.addAsset()
  }

  addAsset(
    assetName: string = this.modelAsset.assetName, 
    assetDescription: string = this.modelAsset.assetDescription,
    assetInformation: string = this.modelAsset.assetInformation
    ): void {
      assetName = assetName.trim();
      if(!assetName) {return}
      this.assetService.addAssetService({assetName, assetDescription,assetInformation} as Asset)
        .subscribe(asset => {
          this.asset.push(asset)
        })
  }

}
