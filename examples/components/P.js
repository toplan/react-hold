/**
 * Created by toplan on 17/6/16.
 */
import hold from 'react-hold'

const holdCondition = (props, prevProps) => !props.children

const P = hold('p', holdCondition)

export default P
