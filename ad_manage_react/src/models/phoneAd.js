import { getPhoneAdsList,} from '../services/phoneAd';

export default {
	namespace: 'phoneAd',

    state: {
	    data: {
	      list: [],
	      pagination: {},
	    },
	    add: {
          status: 'ok',
        },
    },

    effects: {
         *getPhoneAds({ payload }, { call, put }) {
		      const response = yield call(getPhoneAdsList, payload);
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
  },

};
