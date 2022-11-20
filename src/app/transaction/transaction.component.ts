import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Asset } from '../model/asset';
import { Transaction } from '../model/transaction';
import { Warehouse } from '../model/warehouse';
import { AssetService } from '../service/asset.service';
import { TransactionService } from '../service/transaction.service';
import { WarehouseService } from '../service/warehouse.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
    transactions: Transaction[] = [];
    assets: Asset[] = [];
    warehouses: Warehouse[] = [];
    currentTransaction: Transaction =  {
      id: 0,
      assetBarcode: '',
      transactionType: '',
      transactionDate: '',
      transactionQuantity: 0,
      warehouseId: 0
    };
    viewMode = 0;
    errorNotification = false;
    successNotification = false;
    messageAfterSubmit = '';
    inputForm = new FormGroup({
      asset: new FormControl('',[Validators.required]),
      transactionType: new FormControl('',[Validators.required]),
      transactionDate: new FormControl('',[Validators.required]),
      transactionQuantity: new FormControl('',[Validators.required]),
      warehouse: new FormControl('',[Validators.required])
    })

    constructor(
      private transactionService: TransactionService,
      private assetService: AssetService,
      private warehouseService: WarehouseService,
      private route: Router
    ) { }

    ngOnInit(): void {
      this.getTransaction()
    }

    getAsset(): void {
      this.assetService.getAsset()
        .subscribe(assets => {
          this.assets = assets.object
        });
    }

    getWarehouse(): void {
      this.warehouseService.getWarehouse()
        .subscribe(warehouses => {
          this.warehouses = warehouses.object
        });
    }
  
    getTransaction(): void {
      this.transactionService.getTransaction()
        .subscribe(transactions => {
          this.transactions = transactions.object
          console.log(transactions)
        });
    }

    changeViewMode(id: number): void{
      this.viewMode = id;
      if(id === 1){
        this.getAsset()
        this.getWarehouse()
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

    addTransaction(): void{
      console.log(this.inputForm.value)
      const id = 0
      const assetBarcode = this.assets.find(asset => asset.assetName === this.inputForm.get("asset")?.value)?.barcode
      const transactionType = this.inputForm.get("transactionType")?.value
      const transactionDate = this.inputForm.get("transactionDate")?.value
      const transactionQuantity = this.inputForm.get("transactionQuantity")?.value
      const warehouseId = this.warehouses.find(warehouse => warehouse.warehouseName === this.inputForm.get("warehouse")?.value)?.id

      console.log({ id, assetBarcode, transactionType, transactionDate, transactionQuantity, warehouseId  })
      
      this.transactionService.addTransaction({ id, assetBarcode, transactionType, transactionDate, transactionQuantity, warehouseId  } as unknown as Transaction)
        .subscribe(transactionInserted => {
          if(transactionInserted.status === 500){
            this.messageAfterSubmit = transactionInserted.message
            this.toggleErrorNotification(true)
          }else {
            this.messageAfterSubmit = "Transaction Success Inserted!"
            this.toggleSuccessNotification(true)
            this.transactions.push(transactionInserted.object)
            this.changeViewMode(0)
            this.inputForm.reset()
          }
          
        }, (error) => {
          this.messageAfterSubmit = error.message
          this.toggleErrorNotification(true)
        })
      
    }
}
