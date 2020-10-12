import axios from '@/utils/request'

export function getBWData (params) {
  return axios({
    url: '/admin/get-data',
    method: 'get',
    params
  })
}
export function refundInvoice (params) {
  return axios({
    url: '/admin/write-results',
    method: 'post',
    params
  })
}
export function openInvoice (params) {
  return axios({
    url: '/admin/write-results',
    method: 'post',
    params
  })
}
