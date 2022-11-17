export interface Asset {
  barcode: string;
  assetName: string;
  assetDescription: string;
  assetInformation: string;
}

export class AssetModel {
  constructor(
    public assetName: string,
    public assetDescription: string,
    public assetInformation: string
  ){ }
}
