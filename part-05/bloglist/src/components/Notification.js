/*const Notification = ({ message }) => {
  if (message === null || message === '') {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
} */

// notification = {message, style} =============================================
// notification.style='notification' or 'error'
const Notification = ({ notification }) => {
  //console.log('Notification', notification)
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
    <div style={currentStyle}>
      {notification.message}
    </div>
  )
}

export default Notification