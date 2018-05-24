import { isObject, isFunction } from 'lodash'

export default obj => isObject(obj) && isFunction(obj.then)
