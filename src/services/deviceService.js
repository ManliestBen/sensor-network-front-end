import * as tokenService from '../services/tokenService'

const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/devices`

async function getAllDevices() {
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

async function addDevice(deviceData) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 
      Authorization: `Bearer ${tokenService.getToken()}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(deviceData)
  })
  return await res.json()
}

async function getDeviceData(deviceId) {
  const res = await fetch(`${BASE_URL}/${deviceId}`, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

export { 
  getAllDevices,
  addDevice,
  getDeviceData
}
