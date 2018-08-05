(() => {
  function createStore(reducer) {
    let state = reducer();
    let render;
    return {
      dispatch: action => {
        state = reducer(state, action);
        if (render) render();
        return state;
      },
      getState: () => {
        return state;
      },
      subscribe: fun => {
        render = fun;
      }
    };
  }

  window.ARedux = {
    createStore
  };
})();
