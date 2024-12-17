import React, {useContext} from 'react';
import {Context} from "../context";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const NavBar = observer( () => {
    const {user} = useContext(Context);
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">БелГрузСтрах</Navbar.Brand>
                {user.isAuth ?
                    <Nav className={"ml-auto"} style={{color: 'white'}}>
                        <Button variant={"outline-light"}>Админ панель</Button>
                        <Button variant={"outline-light"} className="ms-3" onClick={() => user.setIsAuth(false)}>Выйти</Button>
                    </Nav>
                    :
                    <Nav className={"ml-auto"} style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => user.setIsAuth(true)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;