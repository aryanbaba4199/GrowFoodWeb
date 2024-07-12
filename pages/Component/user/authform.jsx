import React from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
} from '@mui/material';

const Authform = ({
  authType,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  mobile,
  setMobile,
  address,
  setAddress,
  city,
  setCity,
  state,
  setState,
  zip,
  setZip,
  handleAuthSwitch,
  handleSubmit,
}) => {
  return (
    <Container maxWidth="sm">
      <div style={styles.container}>
        {authType === 'SignUp' && (
          <>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Mobile"
              fullWidth
              margin="normal"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <TextField
              label="Address"
              fullWidth
              margin="normal"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              label="City"
              fullWidth
              margin="normal"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              label="State"
              fullWidth
              margin="normal"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <TextField
              label="Zip"
              fullWidth
              margin="normal"
              type="number"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </>
        )}
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} style={styles.button}>
          {authType === 'SignIn' ? 'Sign In' : 'Create Account'}
        </Button>
        <Button variant="text" onClick={handleAuthSwitch}>
          {authType === 'SignIn' ? 'Create Account' : 'Sign In'}
        </Button>
      </div>
    </Container>
  );
};

const styles = {
  container: {
    marginTop: 50,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  button: {
    marginTop: 20,
  },
};

export default Authform;
