import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import { SignInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    // Mando email e password para fazer o login
    const response = yield call(api.post, 'session', {
      email,
      password,
    });

    const { user, token } = response.data;
    if (!user.provider) {
      toast.error('User not provider');
    }
    api.defaults.headers.Authorization = `Bearer ${token}`;

    // Após receber o Sign_IN_REQUEST é necessário chamar o SIGN_IN_SUCCESS(POSSO ACESSAR O auth/SIGN_IN_SUCESS) DE QUALQER REDUX
    yield put(SignInSuccess(token, user));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { email, password, name } = payload;
    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    history.push('/');
  } catch (error) {
    toast.error('Falha no cadastro, verifique seus dados');
    yield put(signFailure());
  }
}

// Como não é uma função async, passo sem o *
// Quando o usuário faz login, é recuperado o token, mas no momento que der f5 o token some pois ele
// Nao passou pelo método sign in novamente para recuperar .. e para resolver isso faço o seguinte método:
// Vale lembrar que o persist/REHYDRATE contém as info armazenadas do usario quando ele loga
export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  // seto o token do header dentro do persist(que é o armazenamento local)
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
