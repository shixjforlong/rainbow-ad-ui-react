import { stringify } from 'qs';
import request from '../utils/request';

export async function getMediasList(params) {
  return request('/api/medias/list', { params});
}
export async function getOSSTokenInfo(params) {
  return request('/ossapi/auth', { body: params, method: 'post' ,params: { verbose: 100 }});
}
