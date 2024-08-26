import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, CircularProgress, Button } from '@mui/material';
import { backend } from '../../declarations/backend';

interface TaxPayer {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
}

const RecordDetailsPage: React.FC = () => {
  const { tid } = useParams<{ tid: string }>();
  const navigate = useNavigate();
  const [taxPayer, setTaxPayer] = useState<TaxPayer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTaxPayerDetails();
  }, [tid]);

  const fetchTaxPayerDetails = async () => {
    if (!tid) return;
    try {
      const result = await backend.getTaxPayerByTID(tid);
      if (result) {
        setTaxPayer(result);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tax payer details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!taxPayer) {
    return (
      <Typography variant="h6" component="p">
        TaxPayer record not found.
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        TaxPayer Details
      </Typography>
      <Typography variant="body1"><strong>TID:</strong> {taxPayer.tid}</Typography>
      <Typography variant="body1"><strong>First Name:</strong> {taxPayer.firstName}</Typography>
      <Typography variant="body1"><strong>Last Name:</strong> {taxPayer.lastName}</Typography>
      <Typography variant="body1"><strong>Address:</strong> {taxPayer.address}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
        sx={{ mt: 2 }}
      >
        Back to List
      </Button>
    </Box>
  );
};

export default RecordDetailsPage;
