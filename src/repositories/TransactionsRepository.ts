import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (accumulator: Balance, currentValue: Transaction) => {
        switch (currentValue.type) {
          case 'income':
            accumulator.income += currentValue.value;
            accumulator.total = accumulator.income - accumulator.outcome;
            break;
          case 'outcome':
            accumulator.outcome += currentValue.value;
            accumulator.total = accumulator.income - accumulator.outcome;
            break;
          default:
            break;
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    return balance;
  }

  public create(data: CreateTransaction): Transaction {
    const transaction = new Transaction(data);

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
