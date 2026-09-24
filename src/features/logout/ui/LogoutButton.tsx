import { useAppDispatch } from '@app/store'
import { logout } from '@entities/auth'
import { Button } from '@telegram-apps/telegram-ui'
import { useNavigate } from 'react-router-dom'
import styles from './LogoutButton.module.scss'

export const LogoutButton = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/registration')
  }

  return (
    <div className={styles.logout}>
      <Button mode="plain" size="m" stretched onClick={handleLogout}>
        Выйти
      </Button>
    </div>
  )
}
