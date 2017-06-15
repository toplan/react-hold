/**
 * Created by toplan on 17/6/2.
 */
import hold from 'react-hold'

const holdCondition = (props, prevProps) => !props.children

export const withHolderProps = (props = {}) => hold('div', holdCondition, props)

const Div = withHolderProps()

export default Div
