import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

interface FormData {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
}

const AddRecordPage: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await backend.createTaxPayer(data.tid, data.firstName, data.lastName, data.address);
      navigate('/');
    } catch (error) {
      console.error('Error creating tax payer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Add New TaxPayer Record
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="tid"
          control={control}
          defaultValue=""
          rules={{ required: 'TID is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="TID"
              fullWidth
              margin="normal"
              error={!!errors.tid}
              helperText={errors.tid?.message}
            />
          )}
        />
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{ required: 'First Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="First Name"
              fullWidth
              margin="normal"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          rules={{ required: 'Last Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name"
              fullWidth
              margin="normal"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          defaultValue=""
          rules={{ required: 'Address is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              fullWidth
              margin="normal"
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Add Record'}
        </Button>
      </form>
    </Box>
  );
};

export default AddRecordPage;
