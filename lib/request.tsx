import capitalize from 'lodash/capitalize'
import qs from 'qs'
import HttpError from 'node-http-error'
import urlJoin from 'url-join'
import config from '~/config'
;['get', 'post', 'put', 'patch', 'head', 'delete'].forEach((method) => {
  request[method] = function runMethodRequest(path, options = {}) {
    return request(path, {...options, method: method.toUpperCase()})
  }
})

export default request

async function request(path, options = {}) {
  options = {
    ...options,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${config.api.bearer_token}`,
      ...options.headers,
    },
  }

  if (options.body && typeof options.body !== 'string' && options.headers['Content-Type'] == 'application/json') {
    options.body = JSON.stringify(options.body)
  }

  if (!/^https?/.test(path)) {
    path = urlJoin(config.api.base, path)
  }

  if (options.query) {
    path = `${path}?${qs.stringify(options.query)}`
  }

  const res = await fetch(path, options)
  //try {
  //Object.assign(res.body, await res.json())
  //} catch (err) {
  //console.log(err)
  //}

  if (!res.ok) {
    const error = new HttpError(res.status, parseErrorMessage(res))
    Object.assign(error, res)
    throw error
  }
  return await res.json()
}

function parseErrorMessage(res) {
  const parseErrorObject = (obj) => {
    return 'Operation failed, please try again.'
  }
  return res.body ? parseErrorObject(res.body) : undefined
}
