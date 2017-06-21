/**
 * Created by toplan on 17/6/2.
 */
import hold from 'react-hold'

const holdCondition = (props, prevProps) => !props.children

const Div = hold('div', holdCondition)

export default Div
