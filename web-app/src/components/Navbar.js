import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function AccountMenu() {
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }}>Harita</Typography>
        <Typography sx={{ minWidth: 100 }}>İstatistikler</Typography>
      </Box>
    </React.Fragment>
  );
}
