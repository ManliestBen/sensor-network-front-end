import styles from './Devices.module.css'
import { Link } from 'react-router-dom'

const Devices = (props) => {
  return (
    <main className={styles.container}>
      <h1>Devices</h1>
      {props.devices.map(device =>
        <div className={styles.device}>
          <h3>{device.name}</h3>
          <h4>{device.location}</h4>
          <h4>{device.controller}</h4>
        </div>
      )}
      <h2><Link to="/devices/new">Add Device</Link></h2>
    </main>
  )
}

export default Devices
