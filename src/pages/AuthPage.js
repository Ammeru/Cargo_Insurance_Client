import React from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTER_ROUTE} from "../utils/consts";
import {NavLink, useLocation} from "react-router-dom";
import '../styles/AuthPage.css';

const AuthPage = () => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;

    return (
        <Container
            className={"d-flex justify-content-center align-items-center"}
            style={{height: window.innerHeight - 100}}
        >
            <Card className="auth-card">
                <h2 className={"m-auto"}>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className={"d-flex flex-column"}>
                    {!isLogin && (
                        <Form.Control
                            className={"mt-3"}
                            placeholder={"Как к вам обращаться..."}
                        />
                    )}
                    <Form.Control
                        className={"mt-3"}
                        placeholder={"Введите ваш email..."}
                    />
                    <Form.Control
                        className={"mt-3"}
                        placeholder={"Введите ваш пароль..."}
                    />
                    <Row className={"mt-3"}>
                        <Col>
                            {isLogin ?
                                <div>
                                    Нет аккаунта? <NavLink to={REGISTER_ROUTE}>Зарегистрируйся!</NavLink>
                                </div>
                                :
                                <div>
                                    Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                                </div>
                            }
                        </Col>
                        <Col className={"d-flex justify-content-end"}>
                            <Button variant={"outline-success"}>
                                {isLogin ? 'Войти' : 'Зарегистрироваться'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default AuthPage;