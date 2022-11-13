const TaxCalculator = require('./taxCalculator');

class ReceiptDetail {
  amount = 1;
  product = '';
  price = 0;
  tax = 0;
  total = 0;
  isImportDuty = false;

  // constructor({
  //   amount = 1,
  //   category = 'basic',
  //   isImportDuty = false,
  //   product = 'no name',
  //   price = 0,
  // }) {
  //   this.product = product;
  //   this.amount = amount;
  //   this.price = price;
  //   this.category = category;
  //   this.isImportDuty = isImportDuty;
  // }

  get total() {
    return Number((this.price * this.amount).toFixed(2));
  }

  get tax() {
    const value = 0;
    const taxCalculator = new TaxCalculator();

    for (let index = 0; index < this.amount; index++) {
      taxValue = taxCalculator({
        category: this.category,
        isImportDuty: this.isImportDuty,
        price: this.price,
      });

      value += taxValue;
    }

    return value;
  }
}

module.exports = ReceiptDetail;
