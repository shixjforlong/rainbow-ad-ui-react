import { stringify } from 'qs';
import request from '../utils/request';

export async function getAreasList(params) {
  return request('/api/areaMan/list', { params});
}