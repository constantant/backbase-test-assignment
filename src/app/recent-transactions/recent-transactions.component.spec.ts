import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RecentTransactionsComponent } from './recent-transactions.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSortModule, MatTableModule } from '@angular/material';
import { AccountService } from '../shared/account.service';
import { of } from 'rxjs';
import { cold } from 'jasmine-marbles';
import { tap } from 'rxjs/operators';

describe('RecentTransactionsComponent', () => {
  let component: RecentTransactionsComponent;
  let fixture: ComponentFixture<RecentTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatSortModule
      ],
      declarations: [RecentTransactionsComponent],
      providers: [
        {
          provide: AccountService,
          useValue: {
            newTransaction$: cold('a', {a: true}),
            getTransactions: () => cold('a', {
              a: {
                data: [
                  {
                    'amount': 82.02,
                    'merchant': 'The Tea Lounge',
                    'transactionDate': 1476933842000,
                    'transactionType': 'Card Payment'
                  },
                  {
                    'amount': 84.64,
                    'merchant': 'Texaco',
                    'transactionDate': 1476926642000,
                    'transactionType': 'Card Payment'
                  },
                  {
                    'amount': 84.76,
                    'merchant': 'The Tea Lounge',
                    'transactionDate': 1476840242000,
                    'transactionType': 'Card Payment'
                  }
                ]
              }
            })
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be sorted right', () => {
    component.sort.sort({id: 'amount', start: 'desc', disableClear: true});
    expect(component.transactions$).toBeObservable(cold('a', {
      a: [
        {
          'amount': 84.76,
          'merchant': 'The Tea Lounge',
          'transactionDate': 1476840242000,
          'transactionType': 'Card Payment'
        },
        {
          'amount': 84.64,
          'merchant': 'Texaco',
          'transactionDate': 1476926642000,
          'transactionType': 'Card Payment'
        },
        {
          'amount': 82.02,
          'merchant': 'The Tea Lounge',
          'transactionDate': 1476933842000,
          'transactionType': 'Card Payment'
        }
      ]
    }));
  });

  it('should be filtered right', () => {
    component.filter.setValue('texaco');
    expect(component.transactions$).toBeObservable(cold('a', {
      a: [
        {
          'amount': 84.64,
          'merchant': 'Texaco',
          'transactionDate': 1476926642000,
          'transactionType': 'Card Payment'
        }
      ]
    }));
  });
});
