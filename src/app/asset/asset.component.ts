import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Asset, AssetResponse } from '../model/asset';
import { Stock } from '../model/stock';
import { AssetService } from '../service/asset.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent {

  // assets!: AssetResponse;
  assets: Asset[] = [];
  stocks: Stock[] = [];
  currentAsset: Asset =  {
    barcode: '',
    assetName: '',
    assetDescription: '',
    assetInformation: ''
  };
  viewMode = 0;
  errorNotification = false;
  successNotification = false;
  messageAfterSubmit = '';

  inputForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    information: new FormControl('',[Validators.required])
  })
  updateForm = new FormGroup({
    barcode: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    information: new FormControl('',[Validators.required])
  })

  constructor(
    private assetService: AssetService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getAsset()
  }

  getAsset(): void {
    this.assetService.getAsset()
      .subscribe(assets => {
        this.assets = assets.object
      });
  }

  changeViewMode(id: number): void{
    this.viewMode = id;
    if(id === 2){
      this.updateForm.setValue({
        barcode: this.currentAsset.barcode,
        name: this.currentAsset.assetName,
        description: this.currentAsset.assetDescription,
        information: this.currentAsset.assetInformation
      })
    }
  }

  toggleErrorNotification(errorNotif: boolean): void{
    this.successNotification = !errorNotif
    this.errorNotification = errorNotif
  }

  toggleSuccessNotification(successNotif: boolean): void{
    this.successNotification = successNotif
    this.errorNotification = !successNotif
  }

  getAssetSelected(asset: Asset): void {
    this.currentAsset = asset
  }

  // getWarehouseDetailStock(asset: Asset): void{
  //   this.getAssetSelected(asset)
  //   this.assetService.getWarehouseDetailStock(asset.barcode)
  //     .subscribe(stockAsset => {
  //       this.stocks = stockAsset.object
  //     })
  // }
  addAsset(): void{
    const assetName = this.inputForm.get("name")?.value
    const assetDescription = this.inputForm.get("description")?.value
    const assetInformation = this.inputForm.get("information")?.value
    const barcode = ''
    
    this.assetService.addWarehouse({ barcode, assetName, assetDescription, assetInformation } as unknown as Asset)
      .subscribe(assetInserted => {
        this.messageAfterSubmit = "Asset Success Inserted!"
        this.toggleSuccessNotification(true)
        this.assets.push(assetInserted.object)
        this.changeViewMode(0)
        this.inputForm.reset()
      }, (error) => {
        this.messageAfterSubmit = error.message
        this.toggleErrorNotification(true)
      })
  }

  editAsset(): void{
    const assetName = this.updateForm.get("name")?.value
    const assetDescription = this.updateForm.get("description")?.value
    const assetInformation = this.updateForm.get("information")?.value
    const barcode = this.updateForm.get("barcode")?.value

    this.assetService.editWarehouse({barcode, assetName, assetDescription, assetInformation} as unknown as Asset)
      .subscribe(assetUpdated => {
        this.messageAfterSubmit = `Asset ${assetUpdated.object.assetName} Success Updated!`
        this.toggleSuccessNotification(true)
        this.changeViewMode(0)
        this.getAsset()
        this.updateForm.reset()
      }, (error) => {
        this.messageAfterSubmit = error.message
        this.toggleErrorNotification(true)
      })
  }

  deleteAsset(barcode: string): void {
    this.assetService.deleteWarehouse(barcode)
      .subscribe(() => {
        this.messageAfterSubmit = `Asset ${this.currentAsset.assetName} Success Deleted!`
        this.toggleSuccessNotification(true)
        this.getAsset()
      }, (error) => {
        this.messageAfterSubmit = error.message
        this.toggleErrorNotification(true)
      })
  }
}
