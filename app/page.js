import styles from './page.module.css'
import { getMessagesData } from '../lib/load-chats';

export default function Home() {
  const allMessages = getMessagesData();
  console.log(allMessages)

  return (
    <ul className={styles.main}>
      {allMessages.map(({ id, role, message }) => (
        <li className={styles.card} key={id}>
          <p className={styles.author}>{role}</p>
          <p className={styles.message}>{message}</p>
        </li>
      ))}
    </ul>
  )
}
