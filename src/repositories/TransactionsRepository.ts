import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
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
    const balanceDefault: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const balance = this.transactions.reduce((accumulator, currently) => {
      if (currently.type === 'income') {
        accumulator.income += currently.value;
      } else {
        accumulator.outcome += currently.value;
      }
      accumulator.total = accumulator.income - accumulator.outcome;
      return accumulator;
    }, balanceDefault);
    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = {
      id: uuid(),
      title,
      value,
      type,
    };

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
