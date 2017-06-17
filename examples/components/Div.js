/**
 * Created by toplan on 17/6/2.
 */
import hold from 'react-hold'

const holdCondition = (props, prevProps) => !props.children

const withHolder = (holder, props) => hold('div', holdCondition, holder, props)

const Div = withHolder()

Div.withHolder = withHolder

export default Div
