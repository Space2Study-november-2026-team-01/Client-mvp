import { fireEvent, screen } from '@testing-library/react'
import { useState } from 'react'
import { vi } from 'vitest'

import QuestionEditor from '~/components/question-editor/QuestionEditor'
import { QuestionTypesEnum } from '~/types'
import { renderWithProviders } from '~tests/test-utils'

const createQuestionForm = (overrides = {}) => ({
  title: 'Question title',
  text: 'Question text',
  type: QuestionTypesEnum.MultipleChoice,
  answers: [
    { id: 0, text: 'First answer', isCorrect: true },
    { id: 1, text: 'Second answer', isCorrect: false }
  ],
  openAnswer: '',
  category: null,
  ...overrides
})

const createEditorProps = (data = createQuestionForm()) => ({
  data,
  handleInputChange: vi.fn(() => vi.fn()),
  handleNonInputValueChange: vi.fn()
})

describe('QuestionEditor', () => {
  it('renders the question input with the provided text', () => {
    renderWithProviders(
      <QuestionEditor {...createEditorProps(createQuestionForm())} />
    )

    expect(screen.getByLabelText('questionPage.question')).toHaveValue(
      'Question text'
    )
  })

  it('renders the Open Answer input for an open-answer question', () => {
    renderWithProviders(
      <QuestionEditor
        {...createEditorProps(
          createQuestionForm({
            type: QuestionTypesEnum.OpenAnswer,
            openAnswer: 'Written response'
          })
        )}
      />
    )

    expect(screen.getByLabelText('questionPage.answer')).toHaveValue(
      'Written response'
    )
    expect(
      screen.queryByPlaceholderText('questionPage.writeYourAnswer')
    ).not.toBeInTheDocument()
  })

  it('changes the question type and resets isCorrect for existing answers', () => {
    const data = createQuestionForm()
    const handleNonInputValueChange = vi.fn()

    renderWithProviders(
      <QuestionEditor
        {...createEditorProps(data)}
        handleNonInputValueChange={handleNonInputValueChange}
      />
    )

    fireEvent.change(screen.getByTestId('app-select'), {
      target: { value: QuestionTypesEnum.OpenAnswer }
    })

    expect(handleNonInputValueChange).toHaveBeenNthCalledWith(1, 'answers', [
      { id: 0, text: 'First answer', isCorrect: false },
      { id: 1, text: 'Second answer', isCorrect: false }
    ])
    expect(handleNonInputValueChange).toHaveBeenNthCalledWith(
      2,
      'type',
      QuestionTypesEnum.OpenAnswer
    )
    expect(handleNonInputValueChange.mock.invocationCallOrder[0]).toBeLessThan(
      handleNonInputValueChange.mock.invocationCallOrder[1]
    )
  })

  it('updates question and answer inputs with controlled values', () => {
    const ControlledQuestionEditor = () => {
      const [data, setData] = useState(createQuestionForm())

      const handleInputChange = (key) => (event) => {
        setData((previousData) => ({
          ...previousData,
          [key]: event.target.value
        }))
      }

      const handleNonInputValueChange = (key, value) => {
        setData((previousData) => ({
          ...previousData,
          [key]: value
        }))
      }

      return (
        <QuestionEditor
          data={data}
          handleInputChange={handleInputChange}
          handleNonInputValueChange={handleNonInputValueChange}
        />
      )
    }

    renderWithProviders(<ControlledQuestionEditor />)

    const questionInput = screen.getByLabelText('questionPage.question')
    fireEvent.change(questionInput, {
      target: { value: 'Updated question' }
    })

    const answerInputs = screen.getAllByPlaceholderText(
      'questionPage.writeYourAnswer'
    )
    const answerInput = answerInputs[0]
    fireEvent.change(answerInput, {
      target: { value: 'Updated answer' }
    })

    expect(questionInput).toHaveValue('Updated question')
    expect(answerInput).toHaveValue('Updated answer')
    expect(answerInputs[1]).toHaveValue('Second answer')
  })

  it('opens the edit title and category menu and calls onEdit', async () => {
    const onEdit = vi.fn()

    renderWithProviders(
      <QuestionEditor {...createEditorProps()} isQuizQuestion onEdit={onEdit} />
    )

    const moreButton = screen.getByTestId('MoreVertIcon').closest('button')
    fireEvent.click(moreButton)

    const editAction = await screen.findByRole('menuitem', {
      name: 'myResourcesPage.questions.titleWithCategory'
    })
    fireEvent.click(editAction)

    expect(onEdit).toHaveBeenCalledTimes(1)
  })
})
