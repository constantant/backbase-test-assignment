import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatSort, Sort, SortDirection } from '@angular/material';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.scss']
})
export class RecentTransactionsComponent implements AfterViewInit {

  filter: FormControl = new FormControl('');

  transactions$: Observable<ITransaction[]>;

  fields = ['transactionDate', 'merchantLogo', 'merchant', 'amount'];

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private accountService: AccountService) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadTransactions();
    });
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

  private loadTransactions() {
    const sortBy = (field: string, direction: SortDirection) =>
      (a: ITransaction, b: ITransaction) => (a[field] < b[field] ? -1 : 1) * (direction === 'desc' ? -1 : 1);

    this.transactions$ = this.accountService.newTransaction$.pipe(
      switchMap(() => this.accountService.getTransactions().pipe(
        map(({data}: ITransactionData) => data),
        switchMap((transactions: ITransaction[]) => this.filter.valueChanges.pipe(
          startWith(''),
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
          map(({active, direction}: Sort) => transactions.sort(sortBy(active, direction)))
        ))
      ))
    );
  }

}
