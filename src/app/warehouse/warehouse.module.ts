import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AssetComponent } from '../asset/asset.component';
import { WarehouseComponent } from './warehouse.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WarehouseModule { }
