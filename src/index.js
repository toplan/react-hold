import Hoc from './HoC'
import Decorator from './Decorator'
import holders from './holders/index'
import shapes from './shapes'
import align from './align'

const $nbsp = '\u00A0'
const holdable = Decorator

Hoc.Decorator = Decorator
Hoc.holdable = holdable // alias
Hoc.hoders = holders
Hoc.shapes = shapes
Hoc.align = align
Hoc.$nbsp = $nbsp

export default Hoc

export {
  Decorator,
  holdable, // alias
  holders,
  shapes,
  align,
  $nbsp,
}
