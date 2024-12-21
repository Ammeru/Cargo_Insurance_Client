import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTER_ROUTE} from "../utils/consts";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import '../styles/UserAuthPage.css';
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../context";

const UserAuthPage = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const history = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(username, email, password);
            }
            user.setUser(user);
            user.setIsAuth(true);
            history(MAIN_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    return (
        <Container
            className={"d-flex justify-content-center align-items-center"}
            style={{height: window.innerHeight - 100}}
        >
            <Card className="user-auth-card">
                <h2 className={"m-auto"}>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className={"d-flex flex-column"}>
                    {!isLogin && (
                        <Form.Control
                            className={"mt-3"}
                            placeholder={"Как к вам обращаться..."}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    )}
                    <Form.Control
                        className={"mt-3"}
                        placeholder={"Введите ваш email..."}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className={"mt-3"}
                        placeholder={"Введите ваш пароль..."}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
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
                            <Button
                                variant={"outline-success"}
                                onClick={click}
                            >
                                {isLogin ? 'Войти' : 'Зарегистрироваться'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default UserAuthPage;