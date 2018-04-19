import { getMediasList,getOSSTokenInfo,} from '../services/media';

export default {
	namespace: 'media',

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
         *getMedias({ payload }, { call, put }) {
		      const response = yield call(getMediasList, payload);
		      yield put({
		        type: 'save',
		        payload: response,
		      });
         },

				 *getOSSToken({payload }, { call, put }) {
					 const { onSuccess } = payload;
		       const { result } = yield call(getOSSTokenInfo, payload);
		       if (result) {
		         yield put({
		           type: 'save',
		           payload: result,
		         });
						 onSuccess(result);
		       }
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
