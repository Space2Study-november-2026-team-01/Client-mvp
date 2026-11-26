import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { useStepContext } from '~/context/step-context'
import { LanguagesEnum } from '~/types'

const LanguageStep = ({ btnsBox, stepLabel }) => {
  const { t } = useTranslation()
  const { stepData, handleStepData } = useStepContext()

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <AppAutoComplete
          getOptionLabel={(language) =>
            t(`common.languages.${language.toLowerCase()}`)
          }
          onChange={(_, value) => handleStepData(stepLabel, value)}
          options={Object.values(LanguagesEnum)}
          textFieldProps={{
            label: t('becomeTutor.language.autocompleteLabel')
          }}
          value={stepData[stepLabel] ?? null}
        />
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
