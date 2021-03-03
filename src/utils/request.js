import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, params).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err);
    })
  })
}

export const post = (url, data = {}) => {
  return new Promise((resovle, reject) => {
    instance.post(url, data,).then(response => {
      resovle(response.data);
    }).catch(err => {
      reject(err);
    })
  })
}

export const patch = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.patch(url, data).then(response => {
        resolve(response.data)
      }).catch(err => {
      reject(err)
    })
  })
}