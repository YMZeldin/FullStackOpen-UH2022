import PropTypes from 'prop-types'

// notification = {message, style} =============================================
// notification.style='notification' or 'error'
const Notification = ({ notification }) => {

  const baseNotifStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const notificationStyle = { ...baseNotifStyle, color: 'green' }
  const errorStyle = { ...baseNotifStyle, color: 'red' }
  const currentStyle = (notification.style === 'notification') ? notificationStyle : errorStyle

  if (notification.message === null || notification.message === '') {
    return null
  }
  return (
    <div id='notification' style={currentStyle}>
      {notification.message}
    </div>
  )
}

// check property types ========================================================
Notification.propTypes = {
  notification: PropTypes.object.isRequired
}

export default Notification