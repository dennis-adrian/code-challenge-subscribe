class TaxCalculator {
  calculate({ category = 'basic', price = 0, isImportDuty = false }) {
    let taxValue = 0;

    if (!price) {
      return 0;
    }

    if (category === 'basic') {
      taxValue = this.roundUpTax(price * 0.1);
    }

    if (isImportDuty) {
      const addedTax = this.roundUpTax(price * 0.05)
      taxValue += addedTax
    }

    return taxValue;
  }

  roundUpTax(value) {
    if (typeof value !== 'number') {
      throw new Error('Parameter should be a number');
    }

    let fixedValue = Number(value.toFixed(2));
    let roundedUpValue = Number(fixedValue.toFixed(2));
    let amountToAdd = Number((0.05 - (fixedValue % 0.05)).toFixed(2));

    return Number((roundedUpValue + amountToAdd).toFixed(2));
  }
}

module.exports = TaxCalculator;
