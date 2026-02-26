import { useRouter } from '../config/i18n'

export const useNavigationActions = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return {
    handleBack,
  }
}
