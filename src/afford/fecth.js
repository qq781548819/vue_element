import axios from './config.js';
import {setStore, getStore} from '../config/mUtils'

export const jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIiLCJpc3MiOiIiLCJhdWQiOiIiLCJzdWIiOiIxMDY4NTUzIiwiaWF0IjoxNTAwNDMxNDMzLCJuYmYiOjE1MDA0MzE0MzMsImV4cCI6MTUzMTk2NzQzMywicGZtIjoiIiwicHJpdiI6IiIsImFyZ3MiOiIifQ.pGJHvbeieX8dYJ7yCS_mTzIP4Q1XQpMOsDMfP3vWkkA";

// export const jwt = getStore('token');
// console.log('jwt->'+jwt);

// export const api = axios;
export const fecth = (act) => {
  return new Promise((resolve, reject) => {
    // const jwt = getStore('token');
    // console.log('jwt->'+jwt);
    axios.post('?token=' + jwt, act)
      .then((response) => {
        if (response.error == "0") {
          resolve(response.result)
        } else {
          reject(`响应数据错误：${JSON.stringify(response)}`)
        }
      }).catch(error => {
        reject(`错误：${error}`)
      })
  })
}
export const net = (act) => {
  return axios.post('/', {
    ...act,
    token: jwt
  })
}

export const test = () => {
  return fecth({
    "act": "normal.live.info"
  });
}

export const jwt_test = () => {
  return fecth({
    "act": "token.user.ginfo"
  });
}
