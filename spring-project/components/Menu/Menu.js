import React from 'react'
import { Container, Navbar, Button, NavbarBrand, Progress, Nav, NavItem, NavLink } from 'reactstrap'
export default function Menu() {
    return (
        <>
            <Navbar
                color="dark"
                expand="md"
                dark >
                <NavbarBrand href="/">
                    Sprint Project
                </NavbarBrand>
                <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/emails">Emails</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/products">
                Produtos
              </NavLink>
            </NavItem>
          </Nav>
            </Navbar>
        </>
    )
}