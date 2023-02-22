import { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select, Button, Grid, Paper, Typography } from '@material-ui/core';

function AssignTripForm() {
  const [trips, setTrips] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);

  // Fetch data from the trip and driver APIs
  useEffect(() => {
    axios.get('http://localhost:3003/trips/viewtrips?intiator=<replace with the initiator value>')
      .then(res => {
        setTrips(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    axios.get('http://localhost:3003/drivers/viewdrivers')
      .then(res => {
        setDrivers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedTrip && selectedDriver) {
      axios.post('http://localhost:3003/trips/assigntrip', {
        tripId: selectedTrip._id,
        driverId: selectedDriver._id
      })
      .then(res => {
        console.log('Trip assigned successfully!');
      })
      .catch(err => {
        console.log(err);
      });
    }
  };

  return (
    <Paper style={{ padding: '2rem' }}>
      <Typography variant="h4" style={{ marginBottom: '2rem' }}>Assign Trip to Driver</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Select Trip:</InputLabel>
              <Select value={selectedTrip ? selectedTrip._id : ''} onChange={e => setSelectedTrip(trips.find(trip => trip._id === e.target.value))}>
                <MenuItem value="">Select a trip</MenuItem>
                {trips.map(trip => (
                  <MenuItem key={trip._id} value={trip._id}>{trip.TripLocation}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Select Driver:</InputLabel>
              <Select value={selectedDriver ? selectedDriver._id : ''} onChange={e => setSelectedDriver(drivers.find(driver => driver._id === e.target.value))}>
                <MenuItem value="">Select a driver</MenuItem>
                {drivers.map(driver => (
                  <MenuItem key={driver._id} value={driver._id}>{driver.driverName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>Assign Trip</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default AssignTripForm;
