import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
};
export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      // Ouço a ação disparada de signIN, que chama a signInSucess, que recupera os dados do usuario logado
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user;
        break;
      }

      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        break;
      }

      case '@user/SIGN_OUT': {
        draft.profile = null;
        break;
      }
      default:
    }
  });
}
