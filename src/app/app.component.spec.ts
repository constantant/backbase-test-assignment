import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AccountService } from './shared/account.service';
import { MatDialogModule } from '@angular/material';
import { cold } from 'jasmine-marbles';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: AccountService,
          useValue: {
            newTransaction$: cold('a', {a: true}),
            getAccount: () => cold('a-b', {
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
              },
              b: {
                name: 'KK',
                accounts: [
                  {
                    id: 'test1',
                    name: 'account1',
                    amount: 150
                  },
                  {
                    id: 'test2',
                    name: 'account2',
                    amount: 100
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

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should show the sum of all accounts`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.account$).toBeObservable(cold('a-b', {
      a: {name: 'KK', amount: 300},
      b: {name: 'KK', amount: 250}
    }));
  });
});
