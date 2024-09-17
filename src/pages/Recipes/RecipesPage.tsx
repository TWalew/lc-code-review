import React, { ChangeEvent, useState } from "react";
import { observer } from "mobx-react-lite";

import { useAppContext } from "app/App";
import { IRecipesPage } from "./types";
import { Button, Form } from "react-bootstrap";

export const RecipesPage: IRecipesPage = observer(() => {
  const {
    store: {
      recipesStore: { editMode, setEditMode, addRecipe },
    },
  } = useAppContext();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div className="container w-100 d-flex">
      <div className="recipes w-50">
        <Button
          variant="success"
          className="add-button"
          onClick={() => setEditMode(true)}
        >
          New Recipe
        </Button>
      </div>
      {editMode && (
        <div className="form w-50">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Recipe Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Place your image url"
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe your recipe"
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>
          </Form>
          <div className="form__actions d-flex justify-content-between">
            <Button
              variant="success"
              onClick={() => addRecipe(name, desc, url)}
            >
              Save
            </Button>
            <Button variant="danger" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
});
