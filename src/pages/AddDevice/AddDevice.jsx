import styles from './AddDevice.module.css'
import { useState } from 'react'

const AddDevice = (props) => {

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    controller: ''
  })

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    props.handleAddDevice(formData)
  }
  return ( 
    <main className={styles.container}>
      <h1>Add Device</h1>
      <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <div className={styles.inputContainer}>
        <label htmlFor="name" className={styles.label}>Name</label>
        <input
          type="text"
          autoComplete="off"
          id="name"
          value={formData.name}
          name="name"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="location" className={styles.label}>Location</label>
        <input
          type="location"
          autoComplete="off"
          id="location"
          value={formData.location}
          name="location"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="controller" className={styles.label}>Controller</label>
        <input
          type="controller"
          autoComplete="off"
          id="controller"
          value={formData.controller}
          name="controller"
          onChange={handleChange}
        />
      </div>
      <div>
        <button className={styles.button}>Add Device</button>
      </div>
    </form>
    </main>
  );
}

export default AddDevice;