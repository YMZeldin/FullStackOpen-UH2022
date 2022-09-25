import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

// show button with label props.buttonLabel or props.children
// click on button changes visibility
// initially show button
const Togglable = forwardRef((props, refs) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id={props.buttonLabel} onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

// to remove eslint error "Component definition is missing display name  react/display-name"
Togglable.displayName = 'Togglable'

// check property types ========================================================
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable