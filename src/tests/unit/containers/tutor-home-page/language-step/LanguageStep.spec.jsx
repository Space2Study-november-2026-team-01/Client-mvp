import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import StepWrapper from '~/components/step-wrapper/StepWrapper'
import {
  tutorStepLabels,
  initialValues
} from '~/components/user-steps-wrapper/constants'
import { StepProvider, useStepContext } from '~/context/step-context'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import { renderWithProviders } from '~tests/test-utils'

const StepPlaceholder = ({ btnsBox }) => <div>{btnsBox}</div>
const SelectedLanguage = () => {
  const { stepData } = useStepContext()

  return <span data-testid='selected-language'>{stepData.language}</span>
}

const children = [
  <StepPlaceholder key='general' />,
  <StepPlaceholder key='subjects' />,
  <LanguageStep key='language' />,
  <StepPlaceholder key='photo' />
]

describe('LanguageStep', () => {
  it('preserves the selected language when navigating between steps', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <StepProvider initialValues={initialValues} stepLabels={tutorStepLabels}>
        <>
          <StepWrapper steps={tutorStepLabels}>{children}</StepWrapper>
          <SelectedLanguage />
        </>
      </StepProvider>
    )

    await user.click(screen.getByText(/Next/i))
    await user.click(screen.getByText(/Next/i))

    const languageInput = screen.getByRole('combobox')
    await user.click(languageInput)
    await user.click(
      screen.getByRole('option', { name: 'common.languages.english' })
    )

    await user.click(screen.getByText(/Back/i))
    await user.click(screen.getByText(/Next/i))

    expect(screen.getByRole('combobox')).toHaveValue('common.languages.english')
    expect(screen.getByTestId('selected-language')).toHaveTextContent('English')
  })
})
