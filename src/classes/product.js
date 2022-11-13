class Product {
  category;
  name;
  price;

  constructor({ category, name, price } = {}) {
    // if (arguments.length < 1) {
    //   throw new Error('Not all parameters were passed');
    // }

    // if (!category || !name || !price) {
    //   throw new Error('Not all parameters were passed');
    // }

    this.category = category;
    this.name = name;
    this.price = price;
  }
}

module.exports = Product;
