import { FC, memo } from 'react';

import { TErrorMessageProps } from '../../utils/types';
import { ErrorMessageUI } from '@ui';

export const ErrorMessage: FC<TErrorMessageProps> = memo(({ error }) => (
  <ErrorMessageUI error={error} />
));
