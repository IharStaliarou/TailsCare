import { create } from 'zustand'

interface IUIState {
  isMobileSidebarOpen: boolean
  openMobileSidebar: () => void
  closeMobileSidebar: () => void
  isDesktopActionsMenuOpen: boolean
  toggleDesktopActionsMenu: () => void
  openDesktopActionsMenu: () => void
  closeDesktopActionsMenu: () => void
}

export const useUIStore = create<IUIState>((set) => ({
  isMobileSidebarOpen: false,
  openMobileSidebar: () => set({ isMobileSidebarOpen: true }),
  closeMobileSidebar: () => set({ isMobileSidebarOpen: false }),
  isDesktopActionsMenuOpen: false,
  toggleDesktopActionsMenu: () =>
    set((state) => ({
      isDesktopActionsMenuOpen: state.isDesktopActionsMenuOpen ? false : true,
    })),
  openDesktopActionsMenu: () => set({ isDesktopActionsMenuOpen: true }),
  closeDesktopActionsMenu: () => set({ isDesktopActionsMenuOpen: false }),
}))
