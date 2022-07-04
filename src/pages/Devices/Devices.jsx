import styles from './Devices.module.css'
import { Link } from 'react-router-dom'

const Devices = () => {
  return (
    <main className={styles.container}>
      <h1>Devices</h1>
      <h2><Link to="/devices/new">Add Device</Link></h2>
    </main>
  )
}

export default Devices
