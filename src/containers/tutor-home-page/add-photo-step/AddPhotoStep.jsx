import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'

const AddPhotoStep = ({ btnsBox }) => {
  const { t } = useTranslation()

  return (
    <Box sx={style.root}>
      <Typography>{t('becomeTutor.photo.description')}</Typography>
      {btnsBox}
    </Box>
  )
}

export default AddPhotoStep
