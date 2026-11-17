import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import { renderWithProviders } from '~tests/test-utils'

vi.mock(
  '~/containers/tutor-home-page/general-info-step/GeneralInfoStep',
  () => ({
    default: () => <div>General info tab</div>
  })
)

vi.mock('~/containers/tutor-home-page/subjects-step/SubjectsStep', () => ({
  default: () => <div>Subjects tab</div>
}))

vi.mock('~/containers/tutor-home-page/language-step/LanguageStep', () => ({
  default: () => <div>Language tab</div>
}))

vi.mock('~/containers/tutor-home-page/add-photo-step/AddPhotoStep', () => ({
  default: () => <div>Photo tab</div>
}))

describe('UserStepsWrapper', () => {
  it('should render the first tab by default', () => {
    renderWithProviders(<UserStepsWrapper userRole='tutor' />)

    expect(screen.getByText('General info tab')).toBeInTheDocument()
  })

  it('should render the second tab when it is selected', async () => {
    renderWithProviders(<UserStepsWrapper userRole='tutor' />)

    await userEvent.click(screen.getByText('step.stepLabels.subjects'))

    expect(screen.getByText('Subjects tab')).toBeInTheDocument()
  })
})
