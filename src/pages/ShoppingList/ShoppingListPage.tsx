import { IShoppingListPage } from './types';
import cnames from 'classnames';
import React from 'react';
import { observer } from 'mobx-react-lite';
import './styles.scss'
import { useAppContext } from 'app/App';
import { Button, Form } from 'react-bootstrap';

export const ShoppingListPage: IShoppingListPage = observer(() => {
  const { store: {
    shoppingListStore: {
      isEdit,
      shopingList,
      currentShoppingItem,
      setCurrentShoppingItem,
      startEditShoppingItem,
      create,
      update,
      clear,
      deleteItem,
    }
  } } = useAppContext();

  return (
    <div className='shopping-list mx-4 px-5'>
      <div className='mb-5'>
        <Form className='d-flex gap-3'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={currentShoppingItem ? currentShoppingItem.name : ''}
                onChange={ (e) => setCurrentShoppingItem({...currentShoppingItem!, name: e.target.value}) }
              />
            </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="0"
              
              value={currentShoppingItem ? currentShoppingItem.amount : 0}
              onChange={ (e) => setCurrentShoppingItem({...currentShoppingItem!, amount: parseInt(e.target.value, 10)}) }
            />
          </Form.Group>
      </Form>
      <div className='d-flex gap-3'>
        <Button 
        variant='success'
        disabled={!currentShoppingItem || currentShoppingItem.name === '' || !currentShoppingItem.amount || currentShoppingItem.amount === 0}
        onClick={() => {
          isEdit ? update(currentShoppingItem!) : create(currentShoppingItem!.name, currentShoppingItem!.amount)
        }}>
          {isEdit ? 'Update' : 'Create'}
        </Button>
        {isEdit && (
          <Button variant='danger' onClick={ () => deleteItem(currentShoppingItem!.id)}>Delete</Button>
        )}
        { (isEdit || currentShoppingItem) && (
          <Button variant='warning' onClick={clear}>Clear</Button>
        )}
      </div>
      </div>
      {shopingList.map((li) => {

        return (
          <div 
            className={cnames(
              'shopping-list__ingredient d-flex gap-2 p-4 border border-2 border-black border-opacity-10',
              {'active': isEdit && currentShoppingItem  && li.id === currentShoppingItem.id}
            )} 
            onClick={() => startEditShoppingItem(li)}
          >
            <div>{li.name}</div>
            
            <div>({li.amount})</div>
          </div>
        )
      })}
    </div>
  );
});
