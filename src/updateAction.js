export default function updateAction(state, payload) {
  return {
    ...state,
    user: {
      ...state.user,
      ...payload,
    },
  };
}
