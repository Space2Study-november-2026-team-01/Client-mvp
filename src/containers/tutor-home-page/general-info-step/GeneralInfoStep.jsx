import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import useAxios from '~/hooks/use-axios'
import locationService from '~/services/location-service'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

const GeneralInfoStep = ({ btnsBox }) => {
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')

  const { response: countries, loading: countriesLoading } = useAxios({
    service: locationService.getCountries,
    defaultResponse: []
  })

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
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) =>
                selected ? (
                  countries.find((item) => item.iso2 === selected)?.name
                ) : (
                  <span style={{ color: '#757575' }}>Select country</span>
                )
            }}
            disabled={countriesLoading}
            fullWidth
            label='Country'
            onChange={(event) => {
              setCountry(event.target.value)
              setCity('')
            }}
            select
            value={country}
          >
            {countries.map((country) => (
              <MenuItem key={country.iso2} value={country.iso2}>
                {country.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) =>
                selected || (
                  <span style={{ color: '#757575' }}>Select city</span>
                )
            }}
            disabled={!country}
            fullWidth
            label='City'
            onChange={(event) => setCity(event.target.value)}
            select
            value={city}
          >
            {/* Cities will be loaded from Backend later */}
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
