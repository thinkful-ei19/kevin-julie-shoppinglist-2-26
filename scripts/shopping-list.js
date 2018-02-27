'use strict';
/* global store, cuid, $, Item */

// eslint-disable-next-line no-unused-vars
const shoppingList = (function(){

  function generateItemElement(item) {
    let itemTitle = `<span class="shopping-item shopping-item__checked">${item.name}</span>`;
    if (!item.checked) {
      itemTitle = `
        <form id="js-edit-item">
          <input class="shopping-item type="text" value="${item.name}" />
        </form>
      `;
    }
  
    return `
      <li class="js-item-element" data-item-id="${item.id}">
        ${itemTitle}
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>`;
  }
  
  function generateShoppingItemsString(shoppingList) {
    const items = shoppingList.map((item) => generateItemElement(item));
    return items.join('');
  }
  
  
  function render() {
    let items = store.items;
    // Filter item list if store prop is true by item.checked === false
    if (store.searchTerm) {
      items = store.searches;
    } 

    if (store.hideCheckedItems) {
      items = store.searches.filter(item => !item.checked);
    }
  
    // render the shopping list in the DOM
    console.log('`render` ran');
    const shoppingListItemsString = generateShoppingItemsString(items);
  
    // insert that HTML into the DOM
    $('.js-shopping-list').html(shoppingListItemsString);
  }
  
  function handleNewItemSubmit() {
    $('#js-shopping-list-form').submit(function (event) {
      event.preventDefault();
      const newItemName = $('.js-shopping-list-entry').val();
      store.addItem(newItemName);
      render();
    });
  }  
  
  function getItemIdFromElement(item) {
    const id = $(item).closest('.js-item-element').data('item-id');
    return store.findById(id).id;
  }
  
  function handleItemCheckClicked() {
    $('.js-shopping-list').on('click', '.js-item-toggle', event => {
      const id = getItemIdFromElement(event.currentTarget);
      console.log('testestest', store.items);
      console.log(id);
      store.findAndToggleChecked(id);
      render();
    });
  }
  
  
  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-shopping-list').on('click', '.js-item-delete', event => {
      // get the index of the item in store.items
      const id = getItemIdFromElement(event.currentTarget);
      // delete the item
      store.findAndDelete(id);
      // render the updated shopping list
      render();
    });
  }
  
  function handleEditShoppingItemSubmit() {
    $('.js-shopping-list').on('submit', '#js-edit-item', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      const itemName = $(event.currentTarget).find('.shopping-item').val();
      // editListItemName(id, itemName);
      store.findAndUpdateName(id, itemName);
      render();
    });
  }
  
  function handleToggleFilterClick() {
    $('.js-filter-checked').click(() => {
      store.toggleCheckedFilter();
      render();
    });
  }
  
  function handleShoppingListSearch() {
    $('.js-shopping-list-search-entry').on('keyup', event => {
      const val = $(event.currentTarget).val();
      store.updateSearchTerm(val);
      console.log(val);
      render();
    });
  }
  
  function bindEventListeners() {
    store.updateSearchTerm('');
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
    handleEditShoppingItemSubmit();
    handleToggleFilterClick();
    handleShoppingListSearch();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());
