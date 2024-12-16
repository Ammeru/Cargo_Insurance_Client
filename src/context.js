import {createContext} from "react";
import UserStorage from "./storage/UserStorage";
import CargoStorage from "./storage/CargoStorage";
import InsurancePolicyStorage from "./storage/InsurancePolicyStorage";

export const Context = createContext(null);

export const ContextProvider = ({children}) => {
    const userStorage = new UserStorage();
    const cargoStorage = new CargoStorage();
    const policyStorage = new InsurancePolicyStorage();

    return (
        <Context.Provider value={{
            user: userStorage,
            cargo: cargoStorage,
            policy: policyStorage
        }}>
            {children}
        </Context.Provider>
    );
};