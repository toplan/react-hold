/**
 * Created by toplan on 17/6/6.
 */
import Decorator from './Decorator'
import holders from './holders/index'
import { LEFT, CENTER, RIGHT } from './align'
import { hasOwnProperty } from './utils'

for (let name in holders) {
  if (hasOwnProperty(holders, name)) {
    Decorator[name] = holders[name]
  }
}

Decorator.LEFT = LEFT
Decorator.CENTER = CENTER
Decorator.RIGHT = RIGHT

export default Decorator
