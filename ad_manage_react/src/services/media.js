import { stringify } from 'qs';
import request from '../utils/request';

export async function getMediasList(params) {
  return request('/api/medias/list', { params});
}
