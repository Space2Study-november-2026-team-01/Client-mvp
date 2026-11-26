import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import CardsWithButton from '~/containers/guest-home-page/cards-with-button/CardsWithButton'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import {
  tutorCardBoxArray,
  studentCardBoxArray
} from '~/containers/guest-home-page/how-it-works/CardBoxArrays'
import { guestRoutes } from '~/router/constants/guestRoutes'
import useSignupDialog from '~/hooks/use-signup-dialog'

import { TypographyVariantEnum, UserRoleEnum } from '~/types'
import { styles } from '~/containers/guest-home-page/how-it-works/HowItWorks.styles'

const HowItWorks = () => {
  const { t } = useTranslation()
  const openSignupDialog = useSignupDialog()

  const [isTutor, setIsTutor] = useState(false)
  const role = isTutor ? UserRoleEnum.Tutor : UserRoleEnum.Student

  const onChange = () => {
    setIsTutor(!isTutor)
  }

  const switchOptions = {
    left: {
      text: t('guestHomePage.howItWorks.learnFromExperts')
    },
    right: {
      text: t('guestHomePage.howItWorks.shareYourExperience')
    }
  }

  return (
    <Box id={guestRoutes.navBar.howItWorks.route}>
      <Box sx={styles.container}>
        <Typography sx={styles.title}>
          {t('guestHomePage.howItWorks.title')}
        </Typography>
        <AppContentSwitcher
          active={isTutor}
          onChange={onChange}
          styles={styles.switch}
          switchOptions={switchOptions}
          typographyVariant={TypographyVariantEnum.H6}
        />
        <CardsWithButton
          array={isTutor ? tutorCardBoxArray : studentCardBoxArray}
          btnText={
            isTutor
              ? t('guestHomePage.whatCanYouDo.teach.actionLabel')
              : t('guestHomePage.whatCanYouDo.learn.actionLabel')
          }
          isTutor={isTutor}
          onClick={openSignupDialog}
          role={role}
        />
      </Box>
    </Box>
  )
}

export default HowItWorks
