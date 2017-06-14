import hold from './hold'
import holdable from './Decorator'
import holders from './holders/index'
import shapes from './shapes'
import align from './align'

const $nbsp = '\u00A0'

hold.holdable = holdable
hold.hoders = holders
hold.shapes = shapes
hold.align = align
hold.$nbsp = $nbsp

export default hold

export {
  holdable,
  holders,
  shapes,
  align,
  $nbsp,
}
