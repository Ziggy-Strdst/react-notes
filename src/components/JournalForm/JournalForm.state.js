export const INITIAL_STATE = {
  isValid: {
    title: true,
    text: true,
  },
  values: {
    title: '',
    text: '',
  },
  isFormReadyToSubmit: false,
};

export function formReducer(state, action) {
  switch (action.type) {
    case 'SUBMIT': {
      const titleValidity = state.values.title?.trim().length;
      const textValidity = state.values.text?.trim().length;
      return {
        ...state,
        isValid: {
          title: titleValidity,
          text: textValidity,
        },
        isFormReadyToSubmit: titleValidity && textValidity,
      };
    }
    case 'RESET_VALIDITY':
      return { ...state, isValid: INITIAL_STATE.isValid };
    case 'CLEAR':
      return {
        ...state,
        values: INITIAL_STATE.values,
        isFormReadyToSubmit: false,
      };
    case 'SET_VALUE':
      return { ...state, values: { ...state.values, ...action.payload } };
  }
}
