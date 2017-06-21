/**
 * Created by toplan on 17/6/19.
 */
import hold from 'react-hold'

const holdCondition = (props, prevProps) => !props.children

const Span = hold('span', holdCondition)

export default Span
