import styles from './DeviceDetails.module.css'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import * as deviceService from '../../services/deviceService'
import moment from 'moment';
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const DeviceDetails = (props) => {
  const location = useLocation()
  const [device, setDevice] = useState({...location.state.device})
  const [readings, setReadings] = useState([])
  const [dates, setDates] = useState([]) 
  const [temps, setTemps] = useState([]) 
  const [hums, setHums] = useState([])
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperature",
        data: [],
        fill: false,
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Humidity",
        data: [],
        fill: false,
        borderColor: "#742774"
      }
    ]
  })

  
  useEffect(()=> {
    const configChart = async () => {
      const readings = await deviceService.getDeviceData(location.state.device._id)
      setReadings(readings)
      setChartData({
        labels: readings.map(reading => moment(reading.createdAt).format('MM/DD h:mm a')),
        datasets: [
          {
            label: "Temperature (°F)",
            data: readings.map(reading => reading.temperature),
            fill: false,
            borderColor: "rgba(75,192,192,1)"
          },
          {
            label: "Humidity (%)",
            data: readings.map(reading => reading.humidity),
            fill: false,
            borderColor: "#742774"
          }
        ]
      })
    }
    configChart()
  }, [location.state.device._id])
  
  
  return (
    <>
      <main className={styles.container}>
        <h1>{device.name} Details</h1>
        <h2>{device.location}</h2>
        <h2>{device.controller}</h2>
      </main>
      <main className={styles.container}>
        <section className={styles.chart}>
          <Line data={chartData} />
        </section>
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