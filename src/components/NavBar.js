import React, {useContext} from 'react';
import {Context} from "../context";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {
    ADMIN_ROUTE,
    BILLING_ROUTE,
    LOGIN_COMPANY_ROUTE,
    LOGIN_ROUTE,
    MyORDERS_ROUTE,
    PROFILE_ROUTE
} from "../utils/consts";
import '../styles/NavBar.css';

const NavBar = observer( () => {
    const {user} = useContext(Context);
    const history = useNavigate();

    return (
        <Navbar className="nabvar" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">БелГрузСтрах</Navbar.Brand>
                {user.isAuth ?
                    <Nav className="nav">
                        {user.role === 'admin' ? (
                                <>
                                    <Button
                                        variant={"outline-light"}
                                        className="center-buttons"
                                        onClick={() => history(ADMIN_ROUTE)}
                                    >
                                        Админка
                                    </Button>
                                </>)
                            :
                            user.role === 'user' ? (
                                    <>
                                        <Button
                                            variant={"outline-light"}
                                            className="center-buttons"
                                            onClick={() => history(BILLING_ROUTE)}
                                        >
                                            Платежи
                                        </Button>
                                        <Button
                                            variant={"outline-light"}
                                            className="center-buttons ms-3"
                                            onClick={() => history(MyORDERS_ROUTE)}
                                        >
                                            Заказы
                                        </Button>
                                        <Button
                                            variant={"outline-light"}
                                            className="right-buttons"
                                            onClick={() => history(PROFILE_ROUTE)}
                                        >
                                            Профиль
                                        </Button>
                                    </>)
                                : (
                                    <>
                                        <Button
                                            variant={"outline-light"}
                                            className="center-buttons"
                                            onClick={() => history(MyORDERS_ROUTE)}
                                        >
                                            Заказы
                                        </Button>
                                        <Button
                                            variant={"outline-light"}
                                            className="right-buttons"
                                            onClick={() => history(PROFILE_ROUTE)}
                                        >
                                            Профиль
                                        </Button>
                                    </>)
                        }
                            <Button
                                variant={"outline-light"}
                                className="right-buttons"
                                onClick={() => history(LOGIN_ROUTE)}
                            >
                                Выйти
                            </Button>
                    </Nav>
                    :
                    <Nav className="nav auth-buttons">
                        <Button
                            variant={"outline-light"}
                            onClick={() => history(LOGIN_COMPANY_ROUTE)}
                        >
                            Авторизация для компаний
                        </Button>
                        <Button
                            variant={"outline-light"}
                            className="ms-3"
                            onClick={() => history(LOGIN_ROUTE)}
                        >
                            Авторизация для пользователей
                        </Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;