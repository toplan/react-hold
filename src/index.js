import hold from './hold'
import holdable from './holdable'
import holders from './holders/index'
import shapes from './shapes'
import align from './align'

hold.holdable = holdable
hold.hoders = holders
hold.shapes = shapes
hold.align = align

export default hold

export {
  holdable,
  holders,
  shapes,
  align
}
