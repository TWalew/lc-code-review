import {
  makeObservable, observable, action, computed, runInAction,
} from 'mobx';

import { IRecipe } from './types';
import { uniqueId } from 'lodash';

export class RecipesStore {
  @observable recipes: IRecipe[] = [];

  @observable editMode: boolean = false;

  @observable editedRecipe: IRecipe | undefined = undefined;

  @observable isFormVisible: boolean = false;

  constructor() {
    
    makeObservable(this);
  }

  @action
    setIsFormVisible = (isFormVisible: boolean) => {
      this.isFormVisible = isFormVisible;
    }

  @action
    setEditedRecipe = (recipe: IRecipe) => {
      this.editedRecipe = recipe;
    }

  @action
    setEditMode = (editMode: boolean, recipe?: IRecipe) => {
      this.editMode = editMode;
      if (editMode === true) {
        this.setIsFormVisible(true)
        if (recipe) {
          this.setEditedRecipe({...recipe})
        }
      }
    }

  @action
    addRecipe = (name: string, description: string, imageUrl: string) => {
      this.recipes.push({
        id: uniqueId(),
        name,
        description,
        imageUrl
      })
    };

  @action
    editRecipe = (recipe: IRecipe) => {
      const foundRecipe = this.recipes.findIndex((r) => r.id === recipe.id);

      if (!foundRecipe && foundRecipe < 0) {
        return;
      } else {
        this.recipes[foundRecipe] = recipe
      }
    }

  @action
    setEditedName = (name: string) => {
      if (this.editedRecipe)
      this.editedRecipe.name = name;
    }

    @action
    setEditedDesc = (desc: string) => {
      if (this.editedRecipe)
      this.editedRecipe.description = desc;
    }

    @action
    setEditedUrl = (url: string) => {
      if (this.editedRecipe)
      this.editedRecipe.imageUrl = url;
    }

  submitRecipeForm = (recipe: IRecipe) => {
    if (this.editMode) {
      this.editRecipe(recipe);
    } else {
      this.addRecipe(
        recipe.name,
      recipe.description,
        recipe.imageUrl
      )
    }
    this.setIsFormVisible(false)
  }
}
