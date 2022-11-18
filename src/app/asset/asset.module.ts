import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AssetComponent } from './asset.component';

const routes: Routes = [
  {
    path: '', component: AssetComponent, children: [
    ]
  }
];

@NgModule({
  declarations: [
    AssetComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AssetModule { }
