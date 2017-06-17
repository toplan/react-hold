/**
 * Created by toplan on 17/6/16.
 */
import hold from 'react-hold'

const holdCondition = (props, prevProps) => !props.children

const withHolder = (holder, props) => hold('p', holdCondition, holder, props)

const P = withHolder()

P.withHolder = withHolder

export default P
