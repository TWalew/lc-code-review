import React, { ChangeEvent, useState } from "react";
import { observer } from "mobx-react-lite";

import { useAppContext } from "app/App";
import { IRecipesPage } from "./types";
import { Button, Form } from "react-bootstrap";

export const RecipesPage: IRecipesPage = observer(() => {
  const {
    store: {
      recipesStore: {
        recipes,
        isFormVisible,
        editMode,
        editedRecipe,
        setIsFormVisible,
        setEditMode,
        addRecipe,
        setEditedName,
        setEditedDesc,
        setEditedUrl,
        submitRecipeForm,
      },
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
          onClick={() => setIsFormVisible(true)}
        >
          New Recipe
        </Button>
        <hr />
        <div className="w-100 d-flex flex-column gap-1">
          {recipes.map((rec) => {
            return (
              <div
                className="recipe d-flex justify-content-between border border-black border-4 border-opacity-10 px-2 py-3"
                onClick={() => setEditMode(true, rec)}
              >
                <div className="recipe__info">
                  <h4>{rec.name}</h4>
                  <span>{rec.description}</span>
                </div>
                <div className="recipe__image">
                  <img src={rec.imageUrl} height={100} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isFormVisible && (
        <div className="form w-50 px-5">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Recipe Name"
                onChange={(e) =>
                  editMode
                    ? setEditedName(e.target.value)
                    : setName(e.target.value)
                }
                value={editMode && editedRecipe ? editedRecipe.name : name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Place your image url"
                onChange={(e) =>
                  editMode
                    ? setEditedUrl(e.target.value)
                    : setUrl(e.target.value)
                }
                value={editMode && editedRecipe ? editedRecipe.imageUrl : url}
              />
            </Form.Group>
            <img
              src={editMode && editedRecipe ? editedRecipe.imageUrl : url}
              height={200}
            />
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe your recipe"
                onChange={(e) =>
                  editMode
                    ? setEditedDesc(e.target.value)
                    : setDesc(e.target.value)
                }
                value={
                  editMode && editedRecipe ? editedRecipe.description : desc
                }
              />
            </Form.Group>
          </Form>
          <div className="form__actions d-flex justify-content-between">
            <Button
              variant="success"
              onClick={() =>
                submitRecipeForm({
                  id: editMode && editedRecipe ? editedRecipe.id : "",
                  name: editMode && editedRecipe ? editedRecipe.name : name,
                  description:
                    editMode && editedRecipe ? editedRecipe.description : desc,
                  imageUrl:
                    editMode && editedRecipe ? editedRecipe.imageUrl : url,
                })
              }
            >
              Save
            </Button>
            <Button variant="danger" onClick={() => setIsFormVisible(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
});
