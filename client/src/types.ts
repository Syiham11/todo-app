export interface Todo {
    id: number;
    uploader: number;
    title: string;
    description: string;
    favorite: boolean;
    complete: boolean;
}

export type State = {
    todos: {
        [id: number]: Todo,
    },
    auth: boolean,
    signin: boolean,
    signout: boolean,
}

export type Action =
| {
    type: 'ADD_TODO';
    payload: Todo;
} | {
    type: 'DEL_TODO';
    payload: Todo;
} | {
    type: 'SET_TODOS';
    payload: Array<Todo>;
} | {
    type: 'SET_USER';
    payload: boolean;
} | {
    type: 'SIGNIN';
    payload: boolean;
} | {
    type: 'SIGNOUT';
    payload: boolean;
};

export type StateProviderProps = {
    reducer: React.Reducer<State, Action>;
    children: React.ReactElement;
}