import { Component, Input } from '@angular/core';
import { Asset } from '../model/asset';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent {
  @Input() assetFromDashboard!: Asset[];
  tanggal = new Date();

  constructor() { }

  ngOnInit(): void {
  }
}
