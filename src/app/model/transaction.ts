export interface Transaction {
    id: number;
    assetBarcode: string;
    transactionType: string;
    transactionDate: string;
    transactionQuantity: number;
    warehouseId: number;
  }
  
  export interface TransactionResponse {
    status: number;
    message: string;
    object: Transaction;
  }
  export interface TransactionBulkResponse {
    status: number;
    message: string;
    object: Transaction[];
  }