import React from 'react';
import {Button, Container} from "react-bootstrap";

const AdminPanelPage = () => {
    return (
        <Container className={"d-flex flex-column"}>
            <Button variant={"outline-dark"} className={"mt-4 p-2"}>
                Добавить тип груза
            </Button>
            <Button variant={"outline-dark"} className={"mt-4 p-2"}>
                Добавить особенность груза
            </Button>
            <Button variant={"outline-dark"} className={"mt-4 p-2"}>
                Просмотр пользователей
            </Button>
            <Button variant={"outline-dark"} className={"mt-4 p-2"}>
                Просмотр компаний
            </Button>
            <Button variant={"outline-dark"} className={"mt-4 p-2"}>
                Просмотр заказов
            </Button>
        </Container>
    );
};

export default AdminPanelPage;