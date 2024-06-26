import { TOrderFullInfo } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: any;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrderFullInfo | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
