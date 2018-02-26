'use strict';
/* global shoppingList, cuid, Item */
// eslint-disable-next-line no-unused-vars
$(document).ready(function() {
  const itemNames = [ 'blueberries', 'apples', 'pears' ];
  itemNames.forEach(name => {
    try {
      Item.validateName(name);
      store.items.push(Item.create(name));
    } catch(error) {
      console.log('Cannot add item: ' + error.message);
    }
  });
  shoppingList.render();


  shoppingList.bindEventListeners();
  shoppingList.render();
});
console.log(Item);
