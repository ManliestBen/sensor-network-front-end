import styles from './DeviceDetails.module.css'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import * as deviceService from '../../services/deviceService'
import moment from 'moment';


const DeviceDetails = (props) => {
  const location = useLocation()
  const [device, setDevice] = useState({...location.state.device})
  const [readings, setReadings] = useState([])
  
  useEffect(()=> {
    deviceService.getDeviceData(location.state.device._id)
    .then(readings => {
      setReadings(readings)
    })
  }, [location.state.device._id])
  
  
  return (
    <>
      <main className={styles.container}>
        <h1>{device.name} Details</h1>
        <h2>{device.location}</h2>
        <h2>{device.controller}</h2>
      </main>
      <main className={styles.readings}>
        {readings?.map(reading => 
          <div className={styles.card} key={reading._id}>
            <h3>Temp: {reading.temperature}</h3>
            <h3>Humidity: {reading.humidity}</h3>
            <h3>{moment(reading.createdAt).format('MM/DD/YY, h:mm a')}</h3>
          </div>
        )}
      </main>
    </>
  );
}

export default DeviceDetails;