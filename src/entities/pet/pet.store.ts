import { LS_LIMIT_BYTES } from '@/shared/constants/localStorage.constants'
import {
  calculateStringSizeInBytes,
  calculateUsagePercentage,
} from '@/shared/utils/localStorage.utils'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { PET_LS_KEY } from './pet.constants'
import { IPet, IWeightHistoryPoint } from './pet.types'

interface IPetState {
  pets: IPet[]
  storageUsagePercent: number

  isAddPetModalOpen: boolean
  openAddPetModal: () => void
  closeAddModal: () => void

  editingPetId: string | null
  isEditModalOpen: boolean
  openEditModal: (id: string) => void
  closeEditModal: () => void

  addPet: (pet: IPet) => void
  removePet: (id: string) => void
  updatePet: (id: string, data: Partial<IPet>) => void
  checkIsNameUnique: (name: string) => boolean
  clearStorage: () => void
  calculateStorageUsage: () => void

  addWeightRecord: (petId: string, record: Omit<IWeightHistoryPoint, 'id'>) => void

  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}

export const usePetStore = create<IPetState>()(
  persist(
    (set, get) => ({
      pets: [],

      isAddPetModalOpen: false,
      openAddPetModal: () => set({ isAddPetModalOpen: true }),
      closeAddModal: () => set({ isAddPetModalOpen: false }),

      editingPetId: null,
      isEditModalOpen: false,
      openEditModal: (id) => set({ editingPetId: id, isEditModalOpen: true }),
      closeEditModal: () => set({ editingPetId: null, isEditModalOpen: false }),

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

      storageUsagePercent: 0,
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

      addWeightRecord: (petId, record) => {
        set((state) => ({
          pets: state.pets.map((pet) => {
            if (pet.id !== petId) {
              return pet
            }

            const newRecord: IWeightHistoryPoint = {
              ...record,
              id: crypto.randomUUID(),
            }

            const updatedHistory = [...(pet.weightHistory || []), newRecord].sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )

            return {
              ...pet,
              weightHistory: updatedHistory,
              currentWeight: updatedHistory[0].weight,
              updatedAt: new Date().toISOString(),
            }
          }),
        }))
      },

      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: PET_LS_KEY,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
