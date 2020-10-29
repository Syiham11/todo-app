export interface Todo {
    id: number;
    uploader: number;
    title: string;
    description: string;
    flag?: boolean;
}

export interface User {
    id: number | null;
}

export type State = {
    todos: {
        [id: number]: Todo,
    },
    uid: User,
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
    payload: User;
};

export type StateProviderProps = {
    reducer: React.Reducer<State, Action>;
    children: React.ReactElement;
}