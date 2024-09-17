/* eslint-disable import/no-extraneous-dependencies */
import { makeObservable } from 'mobx';
import { RecipesStore } from 'stores/Recipes/store';

export class GlobalStore {


  recipesStore: RecipesStore;

  constructor() {
    makeObservable(this);

    this.recipesStore = new RecipesStore();
  }
}
