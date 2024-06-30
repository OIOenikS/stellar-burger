import {
    getFeedOrders,
    initialState,
    feedSlice
} from "../src/features/feedSlice";

const mockOrdersFeed = {
    "success": true,
    "orders": [
        {
            "_id": "667738c8856777001bb1d042",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa0941"
            ],
            "status": "done",
            "name": "Флюоресцентный люминесцентный био-марсианский бургер",
            "createdAt": "2024-06-22T20:49:12.680Z",
            "updatedAt": "2024-06-22T20:49:13.105Z",
            "number": 43917
        },
        {
            "_id": "6677389d856777001bb1d041",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093e"
            ],
            "status": "done",
            "name": "Флюоресцентный люминесцентный бургер",
            "createdAt": "2024-06-22T20:48:29.088Z",
            "updatedAt": "2024-06-22T20:48:29.460Z",
            "number": 43916
        },
    ],
    "total": 43543,
    "totalToday": 136
}
    
describe('tests for feed slice', () => {
    test("initializes correctly", () =>{
        const state = feedSlice.reducer(undefined, { type: ""})
        expect(state).toEqual(initialState);
    })

    test('test getFeedOrders pending', () => {
        const action = { type: getFeedOrders.pending.type};
        const state = feedSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, isLoading: true, error: ''});
    });

    test('test getFeedOrders rejected', () => {
        const action = { type: getFeedOrders.rejected.type, error: { message: "Test" } };
        const state = feedSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, error: "Test", isLoading: false});
    });

    test('test getFeedOrders fulfilled', () => {
        const action = { type: getFeedOrders.fulfilled.type, payload: mockOrdersFeed };
        const state = feedSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState, 
            orders: mockOrdersFeed.orders,
            total: mockOrdersFeed.total, 
            totalToday: mockOrdersFeed.totalToday,  
            isLoading: false,
            error: '' 
        });
    });
});
