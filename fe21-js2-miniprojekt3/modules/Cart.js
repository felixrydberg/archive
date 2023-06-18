export default class Cart {
  // Explicitly defining variables as undefined
  #product = {
    id: undefined,
    name: undefined,
    price: undefined,
    items: undefined,
    url: undefined,
    amount: undefined,
    discount: undefined,
  };

  #cart = [];

  addItem(product) {
    const index = this.#cart.findIndex((val) => val.id === product.id);

    if (index !== -1) {
      this.#cart[index].items++;
    } else {
      this.#product = product;
      this.#cart.push(this.#product);
    }
  }

  decrementItem(id) {
    const i = this.#cart.findIndex((val) => val.id === id);

    if (i !== -1) {
      if (this.#cart[i].items > 1) {
        this.#cart[i].items--;
      } else {
        this.#cart.splice(i, 1);
      }
    }
  }
  incrementItem(id) {
    const i = this.#cart.findIndex((val) => val.id === id);

    if (i !== -1) {
      if (this.#cart[i].items > 1) {
        this.#cart[i].items++;
      }
    }
  }
  removeItem(id) {
    const i = this.#cart.findIndex((val) => val.id === id);

    if (i !== -1) {
      this.#cart.splice(i, 1);
    }
  }
  getItems() {
    if (this.#cart.length === 0) {
      return -1;
    } else {
      return this.#cart;
    }
  }
  getTotalSum() {
    let sum = {
      total: 0,
      discounted: 0,
      items: 0,
    };
    this.#cart.map((val) => {
      if (val.items > 3) {
        sum.discounted += Math.round(val.items * val.price * val.discount);
        sum.total += val.items * val.price;
        sum.items += val.items;
      } else {
        sum.total += val.items * val.price;
        sum.items += val.items;
      }
    });

    sum.total -= sum.discounted;

    return sum;
  }

  updateStock() {
    if (this.getItems() !== -1) {
      for (let i in this.#cart) {
        let { amount, items } = this.#cart[i];

        let newStock = amount - items;
        if (newStock > 0) {
          this.#cart[i].amount = newStock;
        } else {
          this.#cart[i].amount = amount;
        }
      }
    }
  }

  checkout() {
    this.#cart = [];
  }
}
