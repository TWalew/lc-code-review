/* eslint-disable import/no-extraneous-dependencies */
import { makeObservable } from 'mobx';
import { RecipesStore, ShoppingListStore } from 'stores/index';

export class GlobalStore {


  recipesStore: RecipesStore;

  shoppingListStore: ShoppingListStore;

  constructor() {
    makeObservable(this);

    this.recipesStore = new RecipesStore();
    this.shoppingListStore = new ShoppingListStore();
  }
}
