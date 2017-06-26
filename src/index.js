import Hoc from './HoC'
import Decorator from './Decorator'
import holders from './holders/index'
import shapes from './shapes'
import align from './align'

const $nbsp = '\u00A0'
const holdify = Decorator

Hoc.Decorator = Decorator
Hoc.holdify = holdify // alias
Hoc.hoders = holders
Hoc.shapes = shapes
Hoc.align = align
Hoc.$nbsp = $nbsp

export default Hoc

export {
  Decorator,
  holdify, // alias
  holders,
  shapes,
  align,
  $nbsp,
}
