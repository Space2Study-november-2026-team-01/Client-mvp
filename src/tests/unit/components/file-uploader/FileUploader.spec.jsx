import { render, screen, fireEvent } from '@testing-library/react'
import FileUploader from '~/components/file-uploader/FileUploader'
import { vi } from 'vitest'

const buttonText = 'test'
const emitter = vi.fn()
const initialState = []
const initialError = undefined
const validationData = {
  maxFileSize: 10_000_000,
  maxAllFilesSize: 50_000_000,
  filesTypes: ['application/pdf', 'image/jpeg', 'image/png'],
  fileSizeError: 'becomeTutor.documents.fileSizeError',
  allFilesSizeError: 'becomeTutor.documents.allFilesSizeError',
  typeError: 'becomeTutor.documents.typeError',
  maxQuantityFiles: 7
}
const fakeFile = new File(['certificate'], 'test-file.png', {
  type: 'application/pdf'
})

describe('FileUploader test', () => {
  beforeEach(() => {
    render(
      <FileUploader
        buttonText={buttonText}
        emitter={emitter}
        initialError={initialError}
        initialState={initialState}
        isImages
        validationData={validationData}
      />
    )
  })

  it('should render button with upload icon', () => {
    const button = screen.getByText('test')
    const icon = screen.getByTestId('CloudUploadIcon')

    expect(icon).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })
})

describe('FileUploader with an oversized file', () => {
  it('should emit and display a file size error', () => {
    const onUpload = vi.fn()
    const { getByLabelText, rerender } = render(
      <FileUploader
        buttonText={buttonText}
        emitter={onUpload}
        initialError=''
        initialState={[]}
        isImages
        validationData={validationData}
      />
    )
    const oversizedFile = new File(
      [new Uint8Array(validationData.maxFileSize + 1)],
      'large-image.png',
      { type: 'image/png' }
    )

    fireEvent.change(getByLabelText(buttonText), {
      target: { files: [oversizedFile] }
    })

    const uploadResult = {
      files: [],
      error: validationData.fileSizeError
    }
    expect(onUpload).toHaveBeenCalledWith(uploadResult)

    rerender(
      <FileUploader
        buttonText={buttonText}
        emitter={onUpload}
        initialError={uploadResult.error}
        initialState={uploadResult.files}
        isImages
        validationData={validationData}
      />
    )

    expect(screen.getByText(validationData.fileSizeError)).toBeInTheDocument()
  })
})

describe('FileUploader test with file', () => {
  const initialState = [fakeFile]
  beforeEach(() => {
    render(
      <FileUploader
        buttonText={buttonText}
        emitter={emitter}
        initialError={initialError}
        initialState={initialState}
        isImages
        validationData={validationData}
      />
    )
  })
  it('should delete file after uploading', () => {
    const remove = screen.getByTestId('delete-file')
    fireEvent.click(remove)
    const newState = { error: undefined, files: [] }

    expect(emitter).toHaveBeenCalledWith(newState)
  })
})
