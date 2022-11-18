import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Warehouse, WarehouseResponse } from '../model/warehouse';
import { WarehouseService } from '../service/warehouse.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent {
  warehouses: Warehouse[] = [];

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
}
