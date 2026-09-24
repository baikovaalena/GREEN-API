import { Button, List, Title } from '@telegram-apps/telegram-ui'
import { useNavigate } from 'react-router-dom'
import styles from './HomePage.module.scss'
import { useAppDispatch } from '@app/store'
import { logout } from '@entities/auth'

export const HomePage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <List>
          <Title level="1" weight="1" className={styles.title}>
            Главная
          </Title>

          <Button
            type="button"
            size="l"
            stretched
            mode="outline"
            onClick={() => {
              dispatch(logout())
              navigate('/registration', { replace: true })
            }}
          >
            Выйти
          </Button>
        </List>
      </div>
    </div>
  )
}
