import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {LOGIN_COMPANY_ROUTE, REGISTER_COMPANY_ROUTE} from "../utils/consts";
import {NavLink, useLocation} from "react-router-dom";
import { debounce } from 'lodash';
import '../styles/CompanyAuthPage.css';

const CompanyAuthPage = () => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_COMPANY_ROUTE;
    const ApiKey = process.env.REACT_APP_API_KEY;

    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [address, setAddress] = useState("");
    const mapContainerRef = useRef(null);

    // Инициализация карты
    useEffect(() => {
        if (!isLogin && mapContainerRef.current && !map) {
            const loadMap = async () => {
                const { load } = await import("@2gis/mapgl");
                load().then((mapglAPI) => {
                    const newMap = new mapglAPI.Map(mapContainerRef.current, {
                        center: [53.855, 27.605],
                        zoom: 15,
                        key: ApiKey,
                    });

                    setTimeout(() => {
                        newMap.invalidateSize?.(); // Проверка на наличие метода
                    }, 0);
                    setMap(newMap);

                    // Установка маркера
                    const newMarker = new mapglAPI.Marker(newMap, {
                        coordinates: [53.855, 27.605],
                    });
                    setMarker(newMarker);
                });
            };

            loadMap()
                .then(() => console.log("Карта загружена"))
                .catch((error) => console.log("Ошибка при загрузке карты", error));
        }
    }, [isLogin, map]);

    const controllerRef = useRef(null);

    // Функция прямого геокодинга (получение координат по адресу)
    const geocodeAddress = debounce(async (address) => {
        try {
            if (controllerRef.current) {
                controllerRef.current.abort(); // Отменяем предыдущий запрос
                console.log("Предыдущий AbortController отменён", controllerRef.current);
            }

            const controller = new AbortController();
            controllerRef.current = controller;
            console.log("Создан новый AbortController:", controllerRef.current);

            console.log("Запрос отправлен", address);
            const response = await fetch(`https://catalog.api.2gis.com/3.0/items/geocode?q=${encodeURIComponent(address)}&key=${ApiKey}&fields=items.fullName,items.point`, {signal: controller.signal});
            const data = await response.json();

            if (data.result && data.result.items && data.result.items.length > 0) {
                const results = data.result.items.slice(0, 5);
                console.log("Найденные адреса: ", results);
                setAddressList(results);
            } else {
                console.log("Координаты для адреса не найдены");
            }
        } catch (error) {
            if (error.name === "AbortError") {
                console.log("Запрос отменён через AbortController");
            } else {
                console.error("Ошибка при выполнении запроса:", error);
            }
        }
    }, 800);

    // Состояние для хранения списка найденных адресов
    const [addressList, setAddressList] = useState([]);

    // Функция для выбора адреса из списка
    const handleSelectAddress = (item) => {
        const address = item.full_name;
        const { lon, lat } = item.point;

        console.log(item);
        console.log("Выбран адрес:", address);
        console.log("Координаты:", { lat, lon });

        setAddress(address); // Устанавливаем выбранный адрес
        setAddressList([]); // Очищаем список после выбора
        marker.setCoordinates([lon, lat]); // Устанавливаем маркер на карте
        map.setCenter([lon, lat]); // Центрируем карту на выбранных координатах
    };

    return (
        <Container
            className={"d-flex justify-content-center align-items-center"}
            style={{height: window.innerHeight - 100}}
        >
            <Row className="company-auth-row">
                <Col md={isLogin ? 12 : 8} className="company-auth-col">
                    <Card className={`company-auth-card ${isLogin ? 'login' : ''}`}>
                        <h2 className="company-auth-title">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                        <Form className="company-auth-form">
                            {!isLogin && (
                                <Form.Control
                                    className={"mt-3"}
                                    placeholder={"Как называется ваша компания..."}
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
                            {!isLogin && (
                                <Form.Control
                                    className={"mt-3"}
                                    placeholder={"Введите адрес..."}
                                    value={address || ''}
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                        geocodeAddress(e.target.value);
                                    }}
                                />
                            )}
                            {addressList.length > 0 && (
                                <ul className="company-address-list">
                                    {addressList.map((item, index) => (
                                        <li key={index} onClick={() => handleSelectAddress(item)}>
                                            {item.full_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {!isLogin && (
                                <Form.Control
                                    className={"mt-3"}
                                    placeholder={"Описание..."}
                                />
                            )}
                            <Row className="mt-3">
                                <Col>
                                    {isLogin ?
                                        <div>
                                            Нет аккаунта? <NavLink
                                            to={REGISTER_COMPANY_ROUTE}>Зарегистрируйся!</NavLink>
                                        </div>
                                        :
                                        <div>
                                            Есть аккаунт? <NavLink
                                            to={LOGIN_COMPANY_ROUTE}>Войдите!</NavLink>
                                        </div>
                                    }
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <Button variant="outline-success">
                                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
                {!isLogin &&
                    <Col md={4} className="company-map-col">
                        <div
                            ref={mapContainerRef}
                            className="company-map-container"
                        ></div>
                    </Col>
                }
            </Row>
        </Container>
    );
};

export default CompanyAuthPage;