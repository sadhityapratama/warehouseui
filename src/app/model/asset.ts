export interface Asset {
  barcode: string;
  assetName: string;
  assetDescription: string;
  assetInformation: string;
}

export interface AssetBulkResponse {
  status: number;
  message: string;
  object: Asset[];
}
export interface AssetResponse {
status: number;
message: string;
object: Asset;
}

export class AssetModel {
  constructor(
    public assetName: string,
    public assetDescription: string,
    public assetInformation: string
  ){ }
}
