/**
 * Created by toplan on 17/6/19.
 */
import hold from 'react-hold'

const holdCondition = (props, prevProps) => !props.src

const withHolder = (holder, props) => hold('img', holdCondition, holder, props)

const Img = withHolder()

Img.withHolder = withHolder

export default Img
