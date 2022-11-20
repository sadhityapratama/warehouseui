import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Stock } from '../model/stock';
import { Warehouse } from '../model/warehouse';
import { WarehouseService } from '../service/warehouse.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent {
  warehouses: Warehouse[] = [];
  stocks: Stock[] = [];
  currentWarehouse: Warehouse =  {
    id: 0,
    warehouseName: '',
    warehouseLocation: '',
    warehouseCapacity: 0
  };
  viewMode = 0;
  errorNotification = false;
  successNotification = false;
  messageAfterSubmit = '';

  inputForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    location: new FormControl('',[Validators.required]),
    capacity: new FormControl(0,[Validators.required])
  })
  updateForm = new FormGroup({
    id: new FormControl(0,[Validators.required]),
    name: new FormControl('',[Validators.required]),
    location: new FormControl('',[Validators.required]),
    capacity: new FormControl(0,[Validators.required])
  })

  constructor(
    private warehouseService: WarehouseService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getWarehouse()
  }

  getWarehouse(): void {
    this.warehouseService.getWarehouse()
      .subscribe(warehouses => {
        this.warehouses = warehouses.object
      });
  }

  changeViewMode(id: number): void{
    this.viewMode = id;
    if(id === 2){
      this.updateForm.setValue({
        name: this.currentWarehouse.warehouseName,
        location: this.currentWarehouse.warehouseLocation,
        capacity: this.currentWarehouse.warehouseCapacity,
        id: this.currentWarehouse.id
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

  getWarehouseSelected(warehouse: Warehouse): void {
    this.currentWarehouse = warehouse
    console.log(warehouse)
  }

  getWarehouseDetailStock(warehouse: Warehouse): void{
    this.getWarehouseSelected(warehouse)
    this.warehouseService.getWarehouseDetailStock(warehouse.id)
      .subscribe(stockWarehouse => {
        this.stocks = stockWarehouse.object
      })
  }

  addWarehouse(): void{
    const warehouseName = this.inputForm.get("name")?.value
    const warehouseLocation = this.inputForm.get("location")?.value
    const warehouseCapacity = this.inputForm.get("capacity")?.value
    const id = 0
    
    this.warehouseService.addWarehouse({ id, warehouseName, warehouseLocation, warehouseCapacity } as unknown as Warehouse)
      .subscribe(warehouseInserted => {
        this.messageAfterSubmit = "Warehouse Success Inserted!"
        this.toggleSuccessNotification(true)
        this.warehouses.push(warehouseInserted.object)
        this.changeViewMode(0)
        this.inputForm.reset()
      }, (error) => {
        this.messageAfterSubmit = error.message
        this.toggleErrorNotification(true)
      })
  }

  editWarehouse(): void{
    const warehouseName = this.updateForm.get("name")?.value
    const warehouseLocation = this.updateForm.get("location")?.value
    const warehouseCapacity = this.updateForm.get("capacity")?.value
    const id = this.updateForm.get("id")?.value

    this.warehouseService.editWarehouse({id, warehouseName, warehouseLocation, warehouseCapacity} as unknown as Warehouse)
      .subscribe(warehouseUpdated => {
        this.messageAfterSubmit = `Warehouse ${warehouseUpdated.object.warehouseName} Success Updated!`
        this.toggleSuccessNotification(true)
        this.getWarehouse()
        this.changeViewMode(0)
        this.inputForm.reset()
      }, (error) => {
        this.messageAfterSubmit = error.message
        this.toggleErrorNotification(true)
      })
  }

  deleteWarehouse(id: number): void {
    this.warehouseService.deleteWarehouse(id)
      .subscribe(() => {
        this.messageAfterSubmit = `Warehouse ${this.currentWarehouse.warehouseName} Success Deleted!`
        this.toggleSuccessNotification(true)
        this.getWarehouse()
        this.inputForm.reset()
      }, (error) => {
        this.messageAfterSubmit = error.message
        this.toggleErrorNotification(true)
      })
  }
}
