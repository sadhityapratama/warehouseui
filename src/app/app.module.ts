import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { AssetComponent } from './asset/asset.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddAssetComponent } from './add-asset/add-asset.component';

@NgModule({
  declarations: [
    AppComponent,
    WarehouseComponent,
    AssetComponent,
    TransactionComponent,
    DashboardComponent,
    AddAssetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
