import { imageResize, calculatePhotoCut } from '~/utils/image-resize'
import { vi } from 'vitest'

describe('calculatePhotoCut', () => {
  it('shoud resize picture with width > height', () => {
    const originalSizes = { width: 1920, height: 1080 }
    const newSizes = { width: 600, height: 600 }
    const calculatedSizes = calculatePhotoCut(
      originalSizes.width,
      originalSizes.height,
      newSizes.width,
      newSizes.height
    )
    const result = { cutInHeight: 1080, cutInWidth: 1080, newX: 420, newY: 0 }
    expect(calculatedSizes).toMatchObject(result)
  })
  it('shoud resize picture with height > width', () => {
    const originalSizes = { width: 1080, height: 1920 }
    const newSizes = { width: 600, height: 600 }
    const calculatedSizes = calculatePhotoCut(
      originalSizes.width,
      originalSizes.height,
      newSizes.width,
      newSizes.height
    )
    const result = { cutInHeight: 1080, cutInWidth: 1080, newX: 0, newY: 420 }
    expect(calculatedSizes).toMatchObject(result)
  })
})

describe('imageResize', () => {
  const drawImage = vi.fn()
  HTMLCanvasElement.prototype.toDataURL = vi.fn()
  HTMLCanvasElement.prototype.getContext = () => {
    return {
      drawImage
    }
  }
  let onloadRef
  beforeAll(() => {
    Object.defineProperty(Image.prototype, 'onload', {
      get() {
        return this._onload
      },
      set(onload) {
        onloadRef = onload
        this._onload = onload
      }
    })
    Object.defineProperty(Image.prototype, 'naturalWidth', {
      configurable: true,
      value: 1920
    })
    Object.defineProperty(Image.prototype, 'naturalHeight', {
      configurable: true,
      value: 1080
    })
  })
  it('should crop and resize the loaded image and return its data URL', async () => {
    const newImageUrl = 'test.image.png'
    HTMLCanvasElement.prototype.toDataURL.mockReturnValue(newImageUrl)
    const newImage = imageResize('image-for-test.jpeg', {
      newHeight: 600,
      newWidth: 600
    })

    onloadRef()

    expect(await newImage).toBe(newImageUrl)
    expect(drawImage).toHaveBeenCalledTimes(1)
    expect(drawImage.mock.calls[0].slice(1)).toEqual([
      420, 0, 1080, 1080, 0, 0, 600, 600
    ])
    expect(HTMLCanvasElement.prototype.toDataURL).toHaveBeenCalledWith(
      'image/png',
      1
    )
  })
})
