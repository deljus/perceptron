import ACTIVATION from '../../core/activation';
import * as CONST from '../core/constants';

const initState = {
  hiddenLayersSchema: [3,3],
  activation: Object.keys(ACTIVATION)[0],
  learnData: null,
  epoch: 20000,
};

const app = (state = initState, action) => {
  switch (action.type) {
      case(CONST.FILTER_CHANGE):
        const { name, value } = action;
        return {
            ...state,
            [name]: value
        };

  default:
    return { ...state }

  }
}

export {
    app
}
