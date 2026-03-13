import { useState } from 'react'
import notifications from './notifications'
import './App.css'

function Button(props) {
  return (
    <button className="button" onClick={props.onClick}>
      {props.children}
    </button>
  )
}

function Notification(props) {
  return (
    <article className="notification">
      <h2 className="notification-name">{props.name}</h2>
      <p className="notification-message">{props.message}</p>
      <Button onClick={() => props.onClear(props.id)}>Clear</Button>
    </article>
  )
}

function NotificationList(props) {
  if (props.notifications.length === 0) {
    return <p className="empty">No notifications remaining.</p>
  }

  return (
    <section className="notifications-list">
      {props.notifications.map(notification => (
        <Notification
          key={notification.id}
          id={notification.id}
          name={notification.name}
          message={notification.message}
          onClear={props.onClear}
        />
      ))}
    </section>
  )
}

function App() {
  const [items, setItems] = useState(notifications)

  function clearOne(id) {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
  }

  function clearAll() {
    setItems([])
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Notifications</h1>
        <p className="count">Total: {items.length}</p>
        <Button onClick={clearAll}>Clear All</Button>
      </header>

      <NotificationList notifications={items} onClear={clearOne} />
    </div>
  )
}

export default App