import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AssetComponent } from '../asset/asset.component';
import { WarehouseComponent } from './warehouse.component';

const routes: Routes = [
  {
    path: '', component: WarehouseComponent, children: [
    ]
  }
];

@NgModule({
  declarations: [
    WarehouseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WarehouseModule { }
