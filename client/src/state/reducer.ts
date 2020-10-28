import { State, Action } from '../types';

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'GET_TODOS':
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
        case 'GET_USER':
            return {
                ...state,
                uid: action.payload,
            };
        default:
            return state;
    }
}