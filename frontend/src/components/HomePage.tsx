import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, CircularProgress } from '@mui/material';
import DataTable from 'react-data-table-component';
import { backend } from '../../declarations/backend';

interface TaxPayer {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
}

const HomePage: React.FC = () => {
  const [taxPayers, setTaxPayers] = useState<TaxPayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTaxPayers();
  }, []);

  const fetchTaxPayers = async () => {
    try {
      const result = await backend.getAllTaxPayers();
      setTaxPayers(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tax payers:', error);
      setLoading(false);
    }
  };

  const columns = [
    {
      name: 'TID',
      selector: (row: TaxPayer) => row.tid,
      sortable: true,
    },
    {
      name: 'First Name',
      selector: (row: TaxPayer) => row.firstName,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row: TaxPayer) => row.lastName,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row: TaxPayer) => (
        <Button component={Link} to={`/record/${row.tid}`} variant="contained" size="small">
          View
        </Button>
      ),
    },
  ];

  const filteredTaxPayers = taxPayers.filter(
    (taxPayer) =>
      taxPayer.tid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      taxPayer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      taxPayer.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <DataTable
        title="TaxPayer Records"
        columns={columns}
        data={filteredTaxPayers}
        pagination
        responsive
        highlightOnHover
      />
    </div>
  );
};

export default HomePage;
