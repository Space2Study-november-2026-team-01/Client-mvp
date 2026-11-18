import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import TempComponent from '~/tests/unit/components/step-wrapper/TempComponent'
import { StepProvider } from '~/context/step-context'
import {
  initialValues,
  tutorStepLabels
} from '~/components/user-steps-wrapper/constants'
import { renderWithProviders } from '~tests/test-utils'

const renderStepper = () =>
  renderWithProviders(
    <StepProvider initialValues={initialValues} stepLabels={tutorStepLabels}>
      <StepWrapper steps={tutorStepLabels}>
        {[
          <GeneralInfoStep key='1' />,
          <TempComponent key='2'>Second step</TempComponent>,
          <TempComponent key='3'>Third step</TempComponent>,
          <TempComponent key='4'>Fourth step</TempComponent>
        ]}
      </StepWrapper>
    </StepProvider>
  )

describe('GeneralInfoStep', () => {
  it('should show required-field errors for empty names', () => {
    renderStepper()

    expect(screen.getAllByText('common.errorMessages.emptyField')).toHaveLength(
      2
    )
  })

  it('should prevent forward navigation until first and last name are valid', async () => {
    renderStepper()

    await userEvent.click(screen.getByText(/step.stepLabels.subjects/i))
    expect(screen.queryByText('Second step')).not.toBeInTheDocument()

    await userEvent.click(screen.getByText(/common.next/i))

    expect(screen.queryByText('Second step')).not.toBeInTheDocument()

    await userEvent.type(
      screen.getByLabelText(/common.labels.firstName/i),
      'John'
    )
    await userEvent.type(
      screen.getByLabelText(/common.labels.lastName/i),
      'Doe'
    )

    await waitFor(() =>
      expect(
        screen.queryByText('common.errorMessages.emptyField')
      ).not.toBeInTheDocument()
    )

    await userEvent.click(screen.getByText(/common.next/i))

    expect(await screen.findByText('Second step')).toBeInTheDocument()
  })

  it('should keep invalid alphabetic-name values from navigating forward', async () => {
    renderStepper()

    await userEvent.type(
      screen.getByLabelText(/common.labels.firstName/i),
      '123'
    )
    await userEvent.type(
      screen.getByLabelText(/common.labels.lastName/i),
      'Doe'
    )
    await userEvent.click(screen.getByText(/common.next/i))

    expect(screen.queryByText('Second step')).not.toBeInTheDocument()
  })
})
