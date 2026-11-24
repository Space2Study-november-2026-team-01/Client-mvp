import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

const GeneralInfoStep = ({ btnsBox }) => {
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')

  const cities = {
    Ukraine: ['Kyiv', 'Lviv'],
    Poland: ['Warsaw', 'Krakow'],
    Germany: ['Berlin', 'Munich']
  }

  return (
    <Box sx={styles.container}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <Typography variant='h6'>General information</Typography>

        <Typography>Example</Typography>

        <Box>
          <TextField label='First Name*' />
          <TextField label='Last Name*' />
        </Box>

        <Box sx={styles.selectorsContainer}>
          <TextField
            fullWidth
            label='Country'
            onChange={(event) => {
              setCountry(event.target.value)
              setCity('')
            }}
            select
            value={country}
          >
            renderValue=
            {(selected) =>
              selected || (
                <span style={{ color: '#757575' }}>Select country</span>
              )
            }
            <MenuItem value='Ukraine'>Ukraine</MenuItem>
            <MenuItem value='Poland'>Poland</MenuItem>
            <MenuItem value='Germany'>Germany</MenuItem>
          </TextField>

          <TextField
            disabled={!country}
            displayEmpty
            fullWidth
            label='City'
            onChange={(event) => setCity(event.target.value)}
            renderValue={(selected) =>
              selected || <span style={{ color: '#757575' }}>Select city</span>
            }
            select
            value={city}
          >
            {country &&
              cities[country].map((cityName) => (
                <MenuItem key={cityName} value={cityName}>
                  {cityName}
                </MenuItem>
              ))}
          </TextField>
        </Box>

        <TextField
          label='Describe in short your professional status'
          multiline
        />

        <Typography>0/100</Typography>

        <Typography>Inputs with the * sign are required</Typography>
      </Box>

      {btnsBox}
    </Box>
  )
}

export default GeneralInfoStep
