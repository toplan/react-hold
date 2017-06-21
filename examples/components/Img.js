/**
 * Created by toplan on 17/6/19.
 */
import hold from 'react-hold'

const holdCondition = (props, prevProps) => !props.src

const Img = hold('img', holdCondition)

export default Img
