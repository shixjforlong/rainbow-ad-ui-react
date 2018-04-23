import { stringify } from 'qs';
import request from '../utils/request';

export async function getPhoneAdsList(params) {
  return request('/api/adPhone/list', { params});
}
