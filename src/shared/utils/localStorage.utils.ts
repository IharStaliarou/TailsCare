import { CHAR_SIZE_BYTES } from '../constants/localStorage.constants'

/*
 * Calculates the size of a string in bytes
 */
export const calculateStringSizeInBytes = (data: string): number => {
  return data.length * CHAR_SIZE_BYTES
}

/*
 * Calculates the usage percentage of localStorage
 */
export const calculateUsagePercentage = (currentSize: number, limit: number): number => {
  if (limit <= 0) return 0
  const percentage = (currentSize / limit) * 100
  return Math.min(percentage, 100)
}

/*
 * Converts a file to a base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}
