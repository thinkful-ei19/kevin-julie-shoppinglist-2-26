'use strict';
/* global cuid, Item */
const store = (function () {
  //items
  //hide
  //search
  
  return {
    items: [
      { id: cuid(), name: 'apples', checked: false },
      { id: cuid(), name: 'oranges', checked: false },
      { id: cuid(), name: 'milk', checked: true },
      { id: cuid(), name: 'bread', checked: false }
    ],
    hideCheckedItems: false,
    searchTerm: '',
    findById:(id) => {
      return store.items.find(items => items.id === id); 
    },   
    addItem:itemName => {
      try {
        Item.validateName(itemName);
        //let test = Item.create(itemName);
        store.items.push(Item.create(itemName));
        console.log(test);
      } catch (error) {
        console.log(error);
      }
    },
    findAndToggleChecked:(id) => {
      this.findById(id).checked = !(this.findById(id).checked);
    }, 
    findAndUpdateName:(id, newName) => {
      try {
        Item.validateName();
        store.items.findById(id).name = newName;
      } catch(error) {
        console.log('Cannot update name: {error.message}');
      }
    },
    findAndDelete:(id) => {
      store.items = store.items.filter(item => item.id !== id);
      console.log(store.items);
    },

    

  };
  
}() );