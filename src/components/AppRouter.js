import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes";
import {MAIN_ROUTE} from "../utils/consts";
import {Context} from "../context";

const AppRouter = () => {
    const {user, cargo} = useContext(Context);

    console.log(user);
    console.log(cargo);
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route path="*" element={<Navigate to={MAIN_ROUTE}/>} />
        </Routes>
    );
};

export default AppRouter;