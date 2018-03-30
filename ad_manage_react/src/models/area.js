import { getAreasList } from '../services/area';

export default {
	namespace: 'area',
    
    state: {
	    data: {
	      list: [],
	      pagination: {},
	    },
    },

    effects: {
         *getAreas({ payload }, { call, put }) {
		      const response = yield call(getAreasList, payload);
		      yield put({
		        type: 'save',
		        payload: response,
		      });
         },
    },
    reducers: {
	    save(state, { payload }) {
	      return {
	        ...state,
	        data: {
	          list: payload.result,
	          pagination: {
	            total: payload.total,
	            pageSize: payload.limit,
	            current: payload.cursor / payload.limit + 1,
	          },
	        },
	      };
	    },
	    confirmStatus(state, { payload }) {
	      return {
	        ...state,
	        confirm: payload,
	      };
	    },
  },

};