import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction, TransactionBulkResponse, TransactionResponse } from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactionUrl: string = 'http://localhost:8082/transaction';

  constructor(private http: HttpClient) {}

  getTransaction(): Observable<TransactionBulkResponse>{
    return this.http.get<TransactionBulkResponse>(this.transactionUrl+'/listall');
  }

  getTransactionDetail(id: number): Observable<TransactionResponse>{
    const urlByID = `${this.transactionUrl}/get?id=${id}`
    return this.http.get<TransactionResponse>(urlByID)
  }

  addTransaction(transaction: Transaction): Observable<TransactionResponse>{
    return this.http.post<TransactionResponse>(this.transactionUrl+'/add', transaction)
  }

  deleteTransaction(id: number): Observable<TransactionResponse>{
    const urlByID = `${this.transactionUrl}/delete?id=${id}`
    return this.http.delete<TransactionResponse>(urlByID)
  }
}
