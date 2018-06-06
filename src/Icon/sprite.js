import { values } from 'lodash'
import * as symbols from 'ant-design-icons/dist/mobile'

export default [
  '<svg><defs>',
  ...values(symbols),
  '</defs></svg>'
].join('')
