import {
  loginUser,
  updateUser,
  logoutUser,
  authChecked,
  setUser,
  initialState,
  userSlice
} from "../src/features/userSlice";

describe('tests for user slice', () => {
  test("initializes correctly", () =>{
    const state = userSlice.reducer(undefined, { type: ""})
    expect(state).toEqual(initialState);
  })
  test("test authChecked", () => {
    const state = userSlice.reducer(initialState, authChecked());
    expect(state).toEqual({...initialState, isAuthChecked: true});
  });
  test("test setUser", () => {
    const state = userSlice.reducer(initialState, setUser({ email: 'email@ya.ru', name: 'Name'}));
    expect(state).toEqual({...initialState, data: { email: 'email@ya.ru', name: 'Name'}});
  });
  describe('test loginUser', () => {
    test('test loginUser pending', () => {
        const action = { type: loginUser.pending.type};
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, isLoading: true, error: ''});
    });

    test('test loginUser rejected', () => {
        const action = { type: loginUser.rejected.type, error: { message: "Test" } };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, error: "Test", isLoading: false});
    });

    test('test loginUser fulfilled', () => {
        const action = { type: loginUser.fulfilled.type, payload: { email: 'email@ya.ru', name: 'Name'} };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState, 
            data: { email: 'email@ya.ru', name: 'Name'}, 
            isLoading: false,
            error: '' 
        });
    });
  })
  describe('test updateUser', () => {
    test('test updateUser fulfilled', () => {
        const action = { type: updateUser.fulfilled.type, payload: { email: 'z@ya.ru', name: 'Bob'} };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState, 
            data: { email: 'z@ya.ru', name: 'Bob'}, 
            isLoading: false,
            error: '' 
        });
    });
  })
  describe('test logoutUser', () => {
    test('test logoutUser fulfilled', () => {
        const action = { type: logoutUser.fulfilled.type, payload: {"success":true,"message":"Successful logout"} };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState, 
            data: null, 
            isLoading: false,
            error: '' 
        });
    });
  })
});
