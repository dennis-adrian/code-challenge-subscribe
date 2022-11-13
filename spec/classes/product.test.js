const Product = require('../../src/classes/product');

describe('Product', () => {
  it('creates product when all params are passed', () => {
    const params = {
      name: 'book',
      category: 'books',
      price: 12.49,
    };

    const product = new Product(params);

    expect(product).toBeTruthy();
    expect(product.name).toBe(params.name);
    expect(product.category).toBe(params.category);
    expect(product.price).toBe(params.price);
  });
});
