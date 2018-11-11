import { Component, ViewChild } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatSort, Sort, SortDirection } from '@angular/material';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.scss']
})
export class RecentTransactionsComponent {

  filter: FormControl = new FormControl('');

  fields = ['transactionDate', 'merchantLogo', 'merchant', 'amount'];

  @ViewChild(MatSort)
  sort: MatSort;

  transactions$: Observable<ITransaction[]> = this.accountService.newTransaction$.pipe(
    switchMap(() => this.accountService.getTransactions().pipe(
      map(({data}: ITransactionData) => data),
      switchMap((transactions: ITransaction[]) => this.filter.valueChanges.pipe(
        startWith(this.filter.value),
        map((value: string) => {
          if (!value) {
            return transactions;
          }
          const regExp = new RegExp(`${value}`, 'i');
          return transactions.filter(
            ({merchant, transactionType}: ITransaction) => regExp.test(merchant) || regExp.test(transactionType)
          );
        })
      )),
      switchMap((transactions: ITransaction[]) => this.sort.sortChange.pipe(
        startWith({direction: this.sort.direction, active: this.sort.active}),
        map(({active, direction}: Sort) => {
          const sortBy = (field: string, sortDirection: SortDirection) =>
            (a: ITransaction, b: ITransaction) => (a[field] < b[field] ? -1 : 1) * (sortDirection === 'desc' ? -1 : 1);
          return transactions ? transactions.sort(sortBy(active, direction)) : [];
        })
      ))
    ))
  );

  constructor(private accountService: AccountService) {
  }

  sortBy(column: string) {
    let direction;
    switch (this.sort.direction) {
      case 'asc': {
        direction = 'desc';
        break;
      }
      case 'desc':
      case '': {
        direction = 'asc';
        break;
      }
    }
    this.sort.sort({
      id: column,
      start: column === this.sort.active ? direction : 'asc',
      disableClear: true
    });
  }
}
