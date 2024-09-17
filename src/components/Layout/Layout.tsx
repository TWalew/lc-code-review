import React from "react";
import { observer } from "mobx-react-lite";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { useAppContext } from "app/App";
import { ILayout } from "./types";

import "./styles.scss";

export const Layout: ILayout = observer(() => {
  const { store } = useAppContext();

  return (
    <div className="layout">
      <Navbar bg="success" data-bs-theme="dark" className="mb-5">
        <Container>
          <Navbar.Brand href="/">Recipe Book</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Recipes
            </NavLink>
            <NavLink className="nav-link" to="/shopping-list">
              Shopping List
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
});
