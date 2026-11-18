import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import AppTextField from '~/components/app-text-field/AppTextField'
import useForm from '~/hooks/use-form'
import { useStepContext } from '~/context/step-context'
import {
  initialValues,
  validations
} from '~/components/user-steps-wrapper/constants'

const GeneralInfoStep = ({ btnsBox, stepLabel }) => {
  const { t } = useTranslation()
  const { handleStepData } = useStepContext()
  const { data, errors, handleInputChange, handleBlur } = useForm({
    initialValues,
    initialErrors: {
      firstName: validations.firstName(initialValues.firstName),
      lastName: validations.lastName(initialValues.lastName),
      country: '',
      city: '',
      professionalSummary: ''
    },
    validations
  })

  useEffect(() => {
    handleStepData(stepLabel, data, errors)
  }, [handleStepData, stepLabel, data, errors])

  return (
    <Box sx={styles.container}>
      <Box>
        <Typography>{t('becomeTutor.generalInfo.title')}</Typography>
        <AppTextField
          errorMsg={t(errors.firstName)}
          fullWidth
          label={t('common.labels.firstName')}
          onBlur={handleBlur('firstName')}
          onChange={handleInputChange('firstName')}
          required
          value={data.firstName}
        />
        <AppTextField
          errorMsg={t(errors.lastName)}
          fullWidth
          label={t('common.labels.lastName')}
          onBlur={handleBlur('lastName')}
          onChange={handleInputChange('lastName')}
          required
          value={data.lastName}
        />
      </Box>
      {btnsBox}
    </Box>
  )
}

export default GeneralInfoStep
