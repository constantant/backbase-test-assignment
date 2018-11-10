import { Component } from '@angular/core';
import { AccountService } from './shared/account.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { MakeTransferComponent } from './make-transfer/make-transfer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  account$: Observable<{ name: string; amount: number; }> = this.accountService.newTransaction$.pipe(
    switchMap(() => this.accountService.getAccount()),
    map(({name, accounts}: IAccountData) => ({
      name, amount: accounts.reduce((acc, account: IAccount) => acc + account.amount, 0)
    }))
  );

  constructor(private accountService: AccountService,
              private dialog: MatDialog) {
  }

  openAddDialog() {
    this.dialog.open(MakeTransferComponent, {minWidth: ''});
  }
}
