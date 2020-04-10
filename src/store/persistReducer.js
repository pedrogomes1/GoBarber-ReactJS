import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'gobarber', // Geralmente é o nome da aplicação
      storage,
      whitelist: ['auth', 'user'], // Nome dos reducers
    },
    reducers
  );

  return persistedReducer;
};
