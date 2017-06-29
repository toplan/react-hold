import HoC from './HoC'
import Decorator from './Decorator'
import holders from './holders/index'
import shapes from './shapes'
import align from './align'

const $nbsp = '\u00A0'
const holdify = Decorator

HoC.Decorator = Decorator
HoC.holdify = holdify // The alias of decorator
HoC.hoders = holders
HoC.shapes = shapes
HoC.align = align
HoC.$nbsp = $nbsp

export default HoC

export {
  Decorator,
  holdify, // The alias of decorator
  holders,
  shapes,
  align,
  $nbsp,
}
