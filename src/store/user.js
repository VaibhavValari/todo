import create from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStore = create(
  persist(
    (set, get) => ({
      user: undefined,
      todos: [],
      login: (email, password, name) => {
        set({
          user: {
            email,
            password,
            name,
          },
        });
      },
      logout: () => set({user: undefined, todos: []}),
      addTodo: todo => {
        const allTodos = get().todos;
        set({
          todos: [...allTodos, todo],
        });
      },
      deleteTodo: todo => {
        const allTodos = get().todos;
        set({
          todos: [...allTodos.filter(i => i.id !== todo.id)],
        });
      },
      editTodo: todo => {
        const filteredTodos = get().todos.filter(i => i.id !== todo.id);
        set({todos: [...filteredTodos, todo]});
      },
    }),
    {
      name: 'user-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);
