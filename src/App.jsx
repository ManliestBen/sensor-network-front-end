import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import Devices from './pages/Devices/Devices'
import AddDevice from './pages/AddDevice/AddDevice'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import * as deviceService from './services/deviceService'
import DeviceDetails from './pages/DeviceDetails/DeviceDetails'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()
  const [devices, setDevices] = useState([])
  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  useEffect(() => {
    deviceService.getAllDevices()
    .then(devices => {
      setDevices(devices)
    })
  }, [])
  

  const handleAddDevice = (deviceData) => {
    deviceService.addDevice(deviceData)
    .then(addedDevice => {
      setDevices([...devices, addedDevice])
      navigate('/devices')
    })
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/profiles"
          element={user ? <Profiles /> : <Navigate to="/login" />}
        />
        <Route
          path="/devices"
          element={user ? <Devices devices={devices}/> : <Navigate to="/login" />}
        />
        <Route
          path="/devices/new"
          element={user ? <AddDevice handleAddDevice={handleAddDevice} /> : <Navigate to="/login" />}
        />
        <Route
          path="/devices/:id"
          element={user ? <DeviceDetails handleAddDevice={handleAddDevice} /> : <Navigate to="/login" />}
        />
        <Route
          path="/changePassword"
          element={user ? <ChangePassword handleSignupOrLogin={handleSignupOrLogin}/> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  )
}

export default App
