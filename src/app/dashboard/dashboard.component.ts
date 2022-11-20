import { Component } from '@angular/core';
import { Asset } from '../model/asset';
import { AssetService } from '../service/asset.service';
import { Location } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  asset: Asset[] = [];

  constructor(private assetService: AssetService, private location: Location, private route: Router) { }

  ngOnInit(): void {
    console.log("Dashboard Component Loaded")
  }

  logout(): void {
    this.route.navigate(['/login'])
  }

  
}
