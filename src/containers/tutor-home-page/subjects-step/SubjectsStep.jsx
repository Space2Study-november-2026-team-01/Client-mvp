import Box from '@mui/material/Box'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { useStepContext } from '~/context/step-context'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'

const SubjectsStep = ({ btnsBox, stepLabel }) => {
  const { t } = useTranslation()
  const {
    stepData,
    handleStepData,
    subjectCategory: category,
    setSubjectCategory
  } = useStepContext()
  const selectedSubject = stepData[stepLabel]?.[0] ?? null

  const getSubjectsByCategory = useCallback(
    () => subjectService.getSubjectsNames(category),
    [category]
  )

  const handleCategoryChange = (_, value) => {
    setSubjectCategory(value?._id ?? null)
    handleStepData(stepLabel, [])
  }

  const handleSubjectChange = (_, value) => {
    handleStepData(stepLabel, value ? [value._id] : [])
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box alt='' component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Box sx={styles.fieldsBox}>
          <AsyncAutocomplete
            fetchCondition
            fetchOnFocus={!category}
            labelField='name'
            onChange={handleCategoryChange}
            service={categoryService.getCategoriesNames}
            textFieldProps={{
              label: t('becomeTutor.categories.mainSubjectsLabel')
            }}
            value={category}
            valueField='_id'
          />
          <AsyncAutocomplete
            disabled={!category}
            fetchCondition={Boolean(category)}
            fetchOnFocus={!selectedSubject}
            key={category ?? 'no-category'}
            labelField='name'
            onChange={handleSubjectChange}
            service={getSubjectsByCategory}
            textFieldProps={{
              label: t('becomeTutor.categories.subjectLabel')
            }}
            value={selectedSubject}
            valueField='_id'
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
