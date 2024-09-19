import {
  makeObservable, observable, action, computed, runInAction,
  reaction,
} from 'mobx';
import { IShoppingItem } from './types';
import { uniqueId } from 'lodash';
import { json } from 'stream/consumers';

export class ShoppingListStore {
  @observable shopingList: IShoppingItem[] = [];

  @observable currentShoppingItem: IShoppingItem | undefined = undefined;

  @observable isEdit: boolean = false;

  constructor() {
    
    makeObservable(this);

    this.getListFromStorage();

    reaction(() => [this.shopingList.length], () => this.setStorageList())
  }

  getListFromStorage = () => {
    const storage = sessionStorage.getItem('shopping-list');
    if (storage) {
      this.shopingList = JSON.parse(storage);
    }
  }

  setStorageList = () =>{
    sessionStorage.setItem('shopping-list', JSON.stringify(this.shopingList))
  }

  @action
    addShoppingItem = (name: string, amount: number) => {
      this.shopingList.push({
        id: uniqueId(),
        name,
        amount
      })
    };

  @action
  removeShoppingItem = (id: string) => {
    const index = this.shopingList.findIndex((li) => li.id === id)

    if (index > -1) {
    this.shopingList.splice(index, 1)
    }

    return;
  }

  @action
    editShoppingItem = (shoppingItem: IShoppingItem) => {
      const index =this.shopingList.findIndex((item) => item.id === shoppingItem.id);

      if (index > -1 && this.currentShoppingItem) {
        this.shopingList[index] = this.currentShoppingItem;
      }
      console.log('edit', this.shopingList)
    }

  @action
    setCurrentShoppingItem = (shoppingItem: IShoppingItem | undefined) => {
      this.currentShoppingItem = shoppingItem;
    }

  @action
    setIsEdit = (isEdit: boolean) => {
      this.isEdit = isEdit;
    }

  startEditShoppingItem = (shoppingItem: IShoppingItem) => {
    this.setIsEdit(true);
    this.setCurrentShoppingItem(shoppingItem);
    this.editShoppingItem(shoppingItem);
  }

  clear = () => {
    this.setIsEdit(false);
    this.setCurrentShoppingItem(undefined);
  }

  deleteItem = (id:string) => {
    this.removeShoppingItem(id);
    this.clear()
  }

  update = (shoppingItem: IShoppingItem) => {
    this.editShoppingItem(shoppingItem);
    this.clear()
  }

  create = (name: string, amount: number) => {
    this.addShoppingItem(name, amount);
    this.clear()
  }
}
