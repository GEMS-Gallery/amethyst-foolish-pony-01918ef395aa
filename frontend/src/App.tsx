import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import HomePage from './components/HomePage';
import AddRecordPage from './components/AddRecordPage';
import RecordDetailsPage from './components/RecordDetailsPage';

const App: React.FC = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TaxPayer Management System
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/add">Add Record</Button>
        </Toolbar>
      </AppBar>
      <div className="header-image">
        <Typography variant="h2" component="h1">
          TaxPayer Records
        </Typography>
      </div>
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddRecordPage />} />
          <Route path="/record/:tid" element={<RecordDetailsPage />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
