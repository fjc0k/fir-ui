import { values } from 'lodash'
import * as symbols from 'ant-design-icons/dist/mobile'
import { star } from 'ant-design-icons'

export default [
  '<svg><defs>',
  ...values(symbols),
  star,
  '</defs></svg>'
].join('')
