import { FC, memo } from 'react';
import styles from './error-message.module.css';
import { TErrorMessageProps } from '../../../utils/types';

export const ErrorMessageUI: FC<TErrorMessageProps> = memo(
  ({ error }: TErrorMessageProps) => (
    <div className={styles.container}>
      <p className={styles.notification}>
        Что-то пошло не так!Попробуй обновить страницу.
      </p>
      <p>
        <span className={styles.error}>Ошибка:</span>"{error}"
      </p>
    </div>
  )
);
