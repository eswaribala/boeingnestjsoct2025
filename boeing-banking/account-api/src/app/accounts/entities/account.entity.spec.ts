import { Account, AccountType} from './account.entity';
describe('AccountEntity', () => {
  it('should create instance with correct properties', () => {
    const account:Account={
      accountNo: 123456,
      runningTotal: 1000,
      openingDate: new Date('2023-01-01')

    }

    expect(account).toBeDefined();
    expect(account).not.toBeNull();
    expect(account).toHaveProperty('accountNo');
    expect(account.accountNo).toBe(123456);
    expect(account.runningTotal).toBe(1000);
    expect(account.openingDate).toEqual(new Date('2023-01-01'));
  });
  it('should handle deep equality test', () => {
    const account:Account={
      accountNo: 654321,
      runningTotal: 500,
      openingDate: new Date()

    }
    expect(account).toEqual({
      accountNo: 654321,
      runningTotal: 500,
      openingDate: account.openingDate

    });
});
});
