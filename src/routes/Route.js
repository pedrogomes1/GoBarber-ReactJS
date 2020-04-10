import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

import { store } from '~/store';

// eu desestruturo, pois assim recupero a props lá do index das routes
// e pego a propriedade component
export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const { signed } = store.getState().auth;

  // Se a rota for private e ele não estiver logado
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  // Caso ele já esteja logado, ele é redirecionado para dashboard automatico
  // Ele tem que deslogar para poder acessar a rota de login e de cadastro
  // Ai seto elas como não privada
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          {/* O layout é o padrão, que vai ser a tela se NÃO está autenticado(AUTH), ou se ESTÁ (tela DEFAULT) */}
          {/* Dentro desses padrão eu Jogo o componente que vai ser exibido, ele vai pegar estilização do pai(auth ou default) */}
          {/* esse props vem propriedades de navegação, quais parametros vem da rota, history, etc  */}
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
