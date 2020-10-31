import React from 'react';
import { State, Action, StateProviderProps } from '../types';

const initState: State = {
    todos: { },
    auth: false,
    signin: false,
    signout: false,
}

export const StateContext: React.Context<[State, React.Dispatch<Action>]> = React.createContext<[State, React.Dispatch<Action>]>([
    initState,
    (): State => initState,
]);

export const StateProvider: React.FC<StateProviderProps> = ({ reducer, children }): JSX.Element => {
    const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(reducer, initState);

    return (
        <StateContext.Provider value={ [state, dispatch] }>
            { children }
        </StateContext.Provider>
    );
}

export const useStateValue = () => React.useContext<[State, React.Dispatch<Action>]>(StateContext);