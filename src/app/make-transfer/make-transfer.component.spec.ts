import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MakeTransferComponent } from './make-transfer.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../shared/account.service';
import { MatCheckboxModule, MatInputModule, MatSelectModule, MatStepperModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { cold } from 'jasmine-marbles';

describe('MakeTransferComponent', () => {
  let component: MakeTransferComponent;
  let fixture: ComponentFixture<MakeTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatStepperModule
      ],
      declarations: [
        MakeTransferComponent
      ],
      providers: [
        {
          provide: AccountService,
          useValue: {
            newTransaction$: cold('a', {a: true}),
            getAccount: () => cold('a', {
              a: {
                name: 'KK',
                accounts: [
                  {
                    id: 'test1',
                    name: 'account1',
                    amount: 200
                  },
                  {
                    id: 'test2',
                    name: 'account2',
                    amount: 100
                  }
                ]
              }
            }),
            getTransactions: () => cold('a'),
            addTransaction: () => null
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an account list', () => {
    expect(component.accounts$).toBeObservable(cold('a', {
      a: [
        {
          id: 'test1',
          name: 'account1',
          amount: 200
        },
        {
          id: 'test2',
          name: 'account2',
          amount: 100
        }
      ]
    }));
  });

  it('should return a certain account', () => {
    expect(component.getAccount('test1')).toBeObservable(cold('a', {
      a: {
        id: 'test1',
        name: 'account1',
        amount: 200
      }
    }));
  });

  it('should add the new transaction', () => {
    const accountService = TestBed.get(AccountService);
    const addTransactionSpy = spyOn(accountService, 'addTransaction');
    component.stepper.linear = false;
    component.ngAfterViewInit();

    component.form.patchValue({
      from: 'test1',
      to: 'XX',
      amount: 10
    });
    component.stepper.next();

    component.confirmation.setValue(true);
    component.stepper.next();

    expect(addTransactionSpy).toHaveBeenCalledWith(
      {
        amount: 10,
        categoryCode: '#1180aa',
        merchant: 'XX',
        merchantLogo: 'https://avatars2.githubusercontent.com/u/5537730',
        transactionType: 'Transaction'
      },
      'test1'
    );
  });
});
