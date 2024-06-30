import { rootReducer } from '../src/services/store';
import { ingredientsReducer } from '../src/features/ingredientsSlice';
import { feedReducer } from '../src/features/feedSlice';
import { burgerConstructorReducer } from '../src/features/burgerConstructorSlice';
import { userReducer } from '../src/features/userSlice';
import { ordersReducer } from '../src/features/ordersSlice';

describe('проверка правильной настройки и работы rootReducer', () => {
  it('returns the initial state on an unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, action);
    expect(initialState).toEqual({
      ingredients: ingredientsReducer(undefined, action),
      feed: feedReducer(undefined, action),
      burger: burgerConstructorReducer(undefined, action),
      user: userReducer(undefined, action),
      orders: ordersReducer(undefined, action),
    });
  });
});
