import {
  makeObservable, observable, action, computed, runInAction,
} from 'mobx';

import { IRecipe } from './types';
import { uniqueId } from 'lodash';

export class RecipesStore {
  @observable recipes: IRecipe[] = [];

  @observable editMode: boolean = false;

  constructor() {
    
    makeObservable(this);
  }

  @action
    setEditMode = (editMode: boolean) => {
      this.editMode = editMode;
    }

  @action
  addRecipe = (name: string, description: string, imageUrl: string) => {
    console.log("name", name)
    console.log("description", description)
    console.log("imageUrl", imageUrl)
    this.recipes.push({
      id: uniqueId(),
      name,
      description,
      imageUrl
    })
  };
}
