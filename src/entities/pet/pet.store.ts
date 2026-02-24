import { LS_LIMIT_BYTES } from '@/shared/constants/localStorage.constants'
import {
  calculateStringSizeInBytes,
  calculateUsagePercentage,
} from '@/shared/utils/localStorage.utils'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { PET_LS_KEY } from './pet.constants'
import { IPet } from './pet.types'

interface PetState {
  pets: IPet[]
  storageUsagePercent: number

  addPet: (pet: IPet) => void
  removePet: (id: string) => void
  updatePet: (id: string, data: Partial<IPet>) => void
  checkIsNameUnique: (name: string) => boolean
  clearStorage: () => void
  calculateStorageUsage: () => void
}

export const usePetStore = create<PetState>()(
  persist(
    (set, get) => ({
      pets: [],
      storageUsagePercent: 0,

      addPet: (pet) => {
        set((state) => ({ pets: [...state.pets, pet] }))
        get().calculateStorageUsage()
      },

      removePet: (id) => {
        set((state) => ({
          pets: state.pets.filter((pet) => pet.id !== id),
        }))
        get().calculateStorageUsage()
      },

      updatePet: (id, data) => {
        set((state) => ({
          pets: state.pets.map((pet) => (pet.id === id ? { ...pet, ...data } : pet)),
        }))
        get().calculateStorageUsage()
      },

      checkIsNameUnique: (name: string) => {
        const { pets } = get()
        return !pets.some((pet) => pet.name.toLowerCase() === name.toLowerCase())
      },

      clearStorage: () => {
        set({ pets: [] })
        get().calculateStorageUsage()
      },

      calculateStorageUsage: () => {
        if (typeof window === 'undefined') return

        const serializedData = JSON.stringify(get().pets)
        const currentBytes = calculateStringSizeInBytes(serializedData)
        const usage = calculateUsagePercentage(currentBytes, LS_LIMIT_BYTES)

        set({ storageUsagePercent: Number(usage.toFixed(2)) })
      },
    }),
    {
      name: PET_LS_KEY,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (state) => {
        return (rehydratedState, error) => {
          if (error) {
            console.error('[Pet Store] Rehydration error:', error)
          } else {
            rehydratedState?.calculateStorageUsage()
          }
        }
      },
    }
  )
)
