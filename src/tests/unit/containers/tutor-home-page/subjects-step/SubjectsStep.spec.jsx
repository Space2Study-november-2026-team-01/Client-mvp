import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import { StepProvider, useStepContext } from '~/context/step-context'
import { URLs } from '~/constants/request'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'

const categoryIds = {
  mathematics: 'math-category-id',
  science: 'science-category-id'
}

const categories = [
  { _id: categoryIds.mathematics, name: 'Mathematics' },
  { _id: categoryIds.science, name: 'Science' }
]

const subjects = {
  [categoryIds.mathematics]: [
    { _id: 'algebra-id', name: 'Algebra' },
    { _id: 'geometry-id', name: 'Geometry' }
  ],
  [categoryIds.science]: [{ _id: 'physics-id', name: 'Physics' }]
}

const subjectUrl = (categoryId) =>
  `${URLs.categories.get}/${categoryId}${URLs.subjects.getNames}`

const StepDataProbe = () => {
  const { stepData, subjectCategory } = useStepContext()

  return (
    <>
      <output data-testid='selected-category'>{subjectCategory ?? ''}</output>
      <output data-testid='selected-subjects'>
        {JSON.stringify(stepData.subjects)}
      </output>
    </>
  )
}

const StepNavigationHarness = () => {
  const [isOnSubjectsStep, setIsOnSubjectsStep] = useState(true)

  return (
    <>
      {isOnSubjectsStep ? (
        <button onClick={() => setIsOnSubjectsStep(false)}>
          Leave SubjectsStep
        </button>
      ) : (
        <button onClick={() => setIsOnSubjectsStep(true)}>
          Return to SubjectsStep
        </button>
      )}
      {isOnSubjectsStep && <SubjectsStep stepLabel='subjects' />}
      <StepDataProbe />
    </>
  )
}

const renderSubjectsStep = () =>
  renderWithProviders(
    <StepProvider
      initialValues={{}}
      stepLabels={['generalInfo', 'subjects', 'language', 'photo']}
    >
      <>
        <SubjectsStep stepLabel='subjects' />
        <StepDataProbe />
      </>
    </StepProvider>
  )

const renderSubjectsStepWithNavigation = () =>
  renderWithProviders(
    <StepProvider
      initialValues={{}}
      stepLabels={['generalInfo', 'subjects', 'language', 'photo']}
    >
      <StepNavigationHarness />
    </StepProvider>
  )

const selectOption = async (input, name) => {
  await userEvent.click(input)
  fireEvent.click(await screen.findByRole('option', { name }))
}

const getAutocompleteClearButton = (input) => {
  const autocomplete = input.closest('.MuiAutocomplete-root')

  return within(autocomplete).getByTitle('Clear')
}

describe('SubjectsStep', () => {
  beforeEach(() => {
    mockAxiosClient.reset()
    mockAxiosClient.onGet(URLs.categories.getNames).reply(200, categories)
    mockAxiosClient
      .onGet(subjectUrl(categoryIds.mathematics))
      .reply(200, subjects[categoryIds.mathematics])
    mockAxiosClient
      .onGet(subjectUrl(categoryIds.science))
      .reply(200, subjects[categoryIds.science])
  })

  afterEach(() => {
    mockAxiosClient.reset()
  })

  it('fetches categories and the selected category subjects on focus', async () => {
    renderSubjectsStep()
    const [categoryInput, initialSubjectInput] = screen.getAllByRole('combobox')

    expect(initialSubjectInput).toBeDisabled()
    expect(mockAxiosClient.history.get).toHaveLength(0)

    await selectOption(categoryInput, 'Mathematics')

    expect(mockAxiosClient.history.get[0].url).toBe(URLs.categories.getNames)

    const subjectInput = screen.getAllByRole('combobox')[1]
    expect(subjectInput).toBeEnabled()

    await selectOption(subjectInput, 'Algebra')

    expect(mockAxiosClient.history.get[1].url).toBe(
      subjectUrl(categoryIds.mathematics)
    )
    expect(screen.getByTestId('selected-subjects')).toHaveTextContent(
      '["algebra-id"]'
    )
  })

  it('clears the selected subject with its clear icon', async () => {
    renderSubjectsStep()
    const categoryInput = screen.getAllByRole('combobox')[0]

    await selectOption(categoryInput, 'Mathematics')

    const subjectInput = screen.getAllByRole('combobox')[1]
    await selectOption(subjectInput, 'Algebra')

    fireEvent.click(getAutocompleteClearButton(subjectInput))

    expect(subjectInput).toHaveValue('')
    expect(screen.getByTestId('selected-subjects')).toHaveTextContent('[]')
  })

  it('clears the subject and old options when the category changes', async () => {
    renderSubjectsStep()
    const categoryInput = screen.getAllByRole('combobox')[0]

    await selectOption(categoryInput, 'Mathematics')

    let subjectInput = screen.getAllByRole('combobox')[1]
    await selectOption(subjectInput, 'Algebra')

    await userEvent.click(categoryInput)
    fireEvent.change(categoryInput, { target: { value: 'Science' } })
    fireEvent.click(await screen.findByRole('option', { name: 'Science' }))

    expect(screen.getByTestId('selected-subjects')).toHaveTextContent('[]')

    subjectInput = screen.getAllByRole('combobox')[1]
    await userEvent.click(subjectInput)
    const physicsOption = await screen.findByRole('option', { name: 'Physics' })

    expect(
      screen.queryByRole('option', { name: 'Algebra' })
    ).not.toBeInTheDocument()
    expect(
      mockAxiosClient.history.get[mockAxiosClient.history.get.length - 1].url
    ).toBe(subjectUrl(categoryIds.science))
    fireEvent.click(physicsOption)
  })

  it('clears the selected subject when the category is cleared', async () => {
    renderSubjectsStep()
    const [categoryInput] = screen.getAllByRole('combobox')

    await selectOption(categoryInput, 'Mathematics')

    const subjectInput = screen.getAllByRole('combobox')[1]
    await selectOption(subjectInput, 'Algebra')

    fireEvent.click(getAutocompleteClearButton(categoryInput))

    expect(categoryInput).toHaveValue('')
    expect(screen.getAllByRole('combobox')[1]).toBeDisabled()
    expect(screen.getByTestId('selected-subjects')).toHaveTextContent('[]')
  })

  it('preserves the selected category and subject across unmount and remount', async () => {
    renderSubjectsStepWithNavigation()
    const categoryInput = screen.getAllByRole('combobox')[0]

    await selectOption(categoryInput, 'Mathematics')

    const subjectInput = screen.getAllByRole('combobox')[1]
    await selectOption(subjectInput, 'Algebra')

    await userEvent.click(
      screen.getByRole('button', { name: 'Leave SubjectsStep' })
    )
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()

    await userEvent.click(
      screen.getByRole('button', { name: 'Return to SubjectsStep' })
    )

    await waitFor(() => {
      const [restoredCategoryInput, restoredSubjectInput] =
        screen.getAllByRole('combobox')

      expect(restoredCategoryInput).toHaveValue('Mathematics')
      expect(restoredSubjectInput).toHaveValue('Algebra')
    })
    expect(screen.getByTestId('selected-category')).toHaveTextContent(
      categoryIds.mathematics
    )
    expect(screen.getByTestId('selected-subjects')).toHaveTextContent(
      '["algebra-id"]'
    )
  })
})
