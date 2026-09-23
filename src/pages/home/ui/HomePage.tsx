import { Button, List, Section, Title } from '@telegram-apps/telegram-ui'
import styles from './HomePage.module.scss'

export const HomePage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <List>
          <Title level="1" weight="1" className={styles.title}>
            Главный экран
          </Title>

          <Section header="Аккаунт">
            <p className={styles.text}></p>
          </Section>

          <Button size="l" stretched mode="filled" onClick={() => {}}>
            Выйти
          </Button>
        </List>
      </div>
    </div>
  )
}
