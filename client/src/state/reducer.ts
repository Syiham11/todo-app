import { State, Action } from '../types';

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_TODOS':
            return {
                ...state,
                todos: {
                    ...action.payload.reduce((init, todo) => ({
                        ...init,
                        [todo.id]: todo,
                    }), {}),
                    ...state.todos,
                }
            };
        case 'ADD_TODO':
            return {
                ...state,
                todos: {
                    ...state.todos,
                    [action.payload.id]: action.payload,
                }
            }
        case 'DEL_TODO':
            const todo = {
                ...state,
                todos: {
                    ...state.todos,
                },
            }
            delete todo.todos[action.payload.id];

            return todo;
        case 'SET_USER':
            return {
                ...state,
                auth: action.payload,
            };
        case 'SIGNIN':
            return {
                ...state,
                signin: action.payload,
            }
        case 'SIGNOUT':
            return {
                ...state,
                signout: action.payload,
            }
        default:
            return state;
    }
}