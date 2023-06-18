// @ts-nocheck
import Cart from './modules/Cart.js';
import Products from './modules/Products.js';
import { getData, patchData } from './modules/DB.js';

(function () {
  // Firebase object which enables updating database

  // On load, get data from database and create array of products
  (async () => {
    let products = [];

    await getData()
      .then((r) => r.json())
      .then((d) => {
        for (let key in d) {
          const { amount, discount, id, name, price, url } = d[key];
          products.push(new Products(amount, discount, id, name, price, url));
        }
      })
      .catch((error) => alert(`gaming: ${error}`));
    // Create instance of cart and send to button listeners

    const main = document.querySelector('main');

    for (let i in products) {
      const containerForCards = document.createElement('div');
      containerForCards.classList.add('product-card');

      const itemCard = document.createElement('div');
      itemCard.classList.add('card');

      const productName = document.createElement('h1');
      productName.innerText = products[i].getName();

      const currentStock = document.createElement('p');
      currentStock.innerText = `Lager: ${products[i].getAmount()}`;

      const itemPrice = document.createElement('p');
      itemPrice.innerText = `${products[i].getPrice()} kr`;

      const productImage = document.createElement('img');
      productImage.setAttribute('src', products[i].getUrl());
      productImage.setAttribute('alt', products[i].getName());

      const button = document.createElement('button');
      button.classList.add('cartbtn');
      button.setAttribute('value', products[i].getId());
      button.innerText = 'Add to cart';

      containerForCards.appendChild(productName);
      itemCard.appendChild(productImage);
      itemCard.appendChild(itemPrice);
      itemCard.appendChild(currentStock);
      itemCard.appendChild(button);
      containerForCards.append(itemCard);

      main.appendChild(containerForCards);
    }
    setBtnListeners(products);
  })();

  // Creates btn listeners for products
  const setBtnListeners = (products) => {
    const buttons = document.querySelectorAll('.cartbtn');
    const cart = new Cart();

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        addItemToCart(cart, products, button.value);
      });
    });
  };

  // Add item to array of cart products
  const addItemToCart = (cart, products, index) => {
    cart.addItem({
      id: products[index - 1].getId(),
      name: products[index - 1].getName(),
      price: products[index - 1].getPrice(),
      items: 1,
      url: products[index - 1].getUrl(),
      amount: products[index - 1].getAmount(),
      discount: products[index - 1].getDiscount(),
    });

    shoppingCart(cart, products, index);
  };

  // Create and populate shopping cart
  const shoppingCart = (cart, products) => {
    const parent = document.querySelector('.nav-cart');
    parent.classList.add('hidden');
    const ul = document.createElement('ul');
    ul.classList.add('cart-list');
    while (parent.firstChild) {
      parent.removeChild(parent.lastChild);
    }

    for (let key in cart.getItems()) {
      const { id, name, price, items } = cart.getItems()[key];

      //Start -  Elements for each item with +/- and remove btn
      const container = document.createElement('li');

      const itemContainer = document.createElement('ul');
      itemContainer.classList.add('item-container');

      const nameDiv = document.createElement('li');
      nameDiv.innerText = name.toUpperCase();

      const priceDiv = document.createElement('li');
      priceDiv.classList.add('product-items');
      priceDiv.innerText = price;

      const amount = document.createElement('li');
      amount.classList.add('product-items');
      amount.innerText = items;

      // Adds + button with eventlistener
      const increment = document.createElement('button');
      increment.innerText = '+';
      increment.setAttribute('value', id);
      increment.classList.add('countbtn');
      increment.addEventListener('click', () => {
        cart.incrementItem(id);
        shoppingCart(cart);
      });

      // Adds - button with eventlistener
      const decrement = document.createElement('button');
      decrement.innerText = '-';
      decrement.setAttribute('value', id);
      decrement.classList.add('countbtn');
      decrement.addEventListener('click', () => {
        cart.decrementItem(id);
        shoppingCart(cart);
      });

      // Adds x (remove) button with eventlistener
      const remove = document.createElement('button');
      remove.innerText = 'X';
      remove.setAttribute('value', id);
      remove.classList.add('countbtn');
      remove.addEventListener('click', () => {
        cart.removeItem(id);
        shoppingCart(cart);
      });

      // Sets the scene with all elements
      itemContainer.appendChild(nameDiv);
      itemContainer.appendChild(priceDiv);
      itemContainer.appendChild(increment);
      itemContainer.appendChild(amount);
      itemContainer.appendChild(decrement);
      itemContainer.appendChild(remove);
      container.appendChild(itemContainer);
      ul.appendChild(container);
    }
    // Ends Elements for each item with +/- and remove btn
    // Start Elements for total price, total discount and number of items

    const totals = cart.getTotalSum();

    const div = document.createElement('div');
    div.className = 'sum-container';

    // Total sum elements
    for (let total in totals) {
      let suffix = total === 'items' ? 'st' : 'kr';

      const list = document.createElement('ul');
      list.className = `list`;
      const listKey = document.createElement('li');
      const listValue = document.createElement('li');
      listKey.className = 'listitem';
      listValue.className = 'listitem';

      listKey.innerText = `${total.toUpperCase()} = `;
      listValue.innerText = `${totals[total]} ${suffix}`;
      list.appendChild(listKey);
      list.appendChild(listValue);
      div.appendChild(list);
    }
    // End Elements for total price, total discount and number of items

    const button = document.createElement('button');
    button.innerText = 'Checkout';
    button.classList.add('checkoutbtn');

    parent.appendChild(ul);
    parent.append(div);
    parent.appendChild(button);

    if (cart.getItems() !== -1) {
      document.querySelector('header nav img').addEventListener('click', () => {
        document.querySelector('.nav-cart ul').style.display = 'block';
      });
      button.addEventListener('click', () => {
        checkout(cart);
      });
    }
  };

  const checkout = (cart) => {
    cart.updateStock();
    for (let i in cart.getItems()) {
      patchData(cart.getItems()[i], cart.getItems()[i].id);
    }

    cart.checkout();
    shoppingCart(cart);
    window.location.reload();
  };
})();
