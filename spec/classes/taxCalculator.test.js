const TaxCalculator = require('../../src/classes/taxCalculator');

describe('TaxCalculator', () => {
  let taxCalculator;

  beforeEach(() => {
    taxCalculator = new TaxCalculator();
  });

  it('creates a taxCalculator', () => {
    expect(taxCalculator).toBeTruthy();
  });

  describe('roundUpTax', () => {
    it('returns error if param is not a number', () => {
      expect(() => taxCalculator.roundUpTax()).toThrow(
        'Parameter should be a number'
      );
      expect(() => taxCalculator.roundUpTax('hello')).toThrow(
        'Parameter should be a number'
      );
      expect(() => taxCalculator.roundUpTax([])).toThrow(
        'Parameter should be a number'
      );
      expect(() => taxCalculator.roundUpTax({})).toThrow(
        'Parameter should be a number'
      );
    });

    it('rounds up input to the nearest 0.05 value', () => {
      // Added hard-coded values to determine what is actually expected
      expect(taxCalculator.roundUpTax(5.6125)).toBe(5.65);
      expect(taxCalculator.roundUpTax(1.2)).toBe(1.2);
      expect(taxCalculator.roundUpTax(0.5625)).toBe(0.6);
      expect(taxCalculator.roundUpTax(1.499)).toBe(1.5);
    });
  });

  describe('calculate', () => {
    const returnsZero = (params) => {
      it('returns 0', () => {
        expect(taxCalculator.calculate(params)).toBe(0);
        expect(taxCalculator.calculate(params)).toBe(0);
      });
    };

    describe('when price is 0', () => {
      returnsZero({});
      returnsZero({ price: 0 });
    });

    describe('when category is basic', () => {
      it('returns the 10% of the price and rounds it up', () => {
        let params = { price: 20 };
        expect(taxCalculator.calculate(params)).toBe(params.price * 0.1);

        params = { price: 14.99, category: 'basic' };
        expect(taxCalculator.calculate(params)).toBe(
          taxCalculator.roundUpTax(params.price * 0.1)
        );
      });
    });

    describe('when isImportDuty is true', () => {
      describe('when category is basic', () => {
        it('returns the 15% of the price and rounds it up', () => {
          let params = { price: 20, isImportDuty: true };
          expect(taxCalculator.calculate(params)).toBe(
            taxCalculator.roundUpTax(params.price * 0.15)
          );

          params = { price: 14.99, category: 'basic', isImportDuty: true };
          expect(taxCalculator.calculate(params)).toBe(
            taxCalculator.roundUpTax(params.price * 0.15)
          );
        });
      });

      describe('when category is other categories', () => {
        it('returns the 5% of the price and rounds it up', () => {
          let params = { price: 20, category: 'food', isImportDuty: true };
          expect(taxCalculator.calculate(params)).toBe(
            taxCalculator.roundUpTax(params.price * 0.05)
          );

          params = { price: 14.99, category: 'books', isImportDuty: true };
          expect(taxCalculator.calculate(params)).toBe(
            taxCalculator.roundUpTax(params.price * 0.05)
          );
        });
      });
    });
  });
});
