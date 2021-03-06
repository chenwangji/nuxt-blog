import axios from 'axios'
import * as config from '../config'

const ax = axios.create({
  baseURL: config.API_ROOT
})

ax.interceptors.request.use(config => config, err => Promise.reject(err))

ax.interceptors.response.use(res => res.data, err => Promise.reject(err))

export default ax
