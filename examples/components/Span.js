/**
 * Created by toplan on 17/6/19.
 */
import hold from 'react-hold'

const holdCondition = (props, prevProps) => !props.children

const withHolder = (holder, props) => hold('span', holdCondition, holder, props)

const Span = withHolder()

Span.withHolder = withHolder

export default Span
