import {
getOrders,
getOrder,
orderBurger,
initialState,
ordersSlice,
} from "../src/features/ordersSlice";


const mockOrders = [
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
]

const mockOrder = [
    {
        "_id": "667bf8a3856777001bb1de95",
        "ingredients": [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa0941",
            "643d69a5c3f7b9001cfa093c"
        ],
        "owner": "667be02e856777001bb1dd8d",
        "status": "done",
        "name": "Краторный био-марсианский бургер",
        "createdAt": "2024-06-26T11:16:51.378Z",
        "updatedAt": "2024-06-26T11:16:51.800Z",
        "number": 44343,
        "__v": 0
    }
]

const mockOrderBurger = {
    "success": true,
    "name": "Флюоресцентный минеральный бургер",
    "order": {
        "ingredients": [
        {
            "_id": "643d69a5c3f7b9001cfa093d",
            "name": "Флюоресцентная булка R2-D3",
            "type": "bun",
            "proteins": 44,
            "fat": 26,
            "carbohydrates": 85,
            "calories": 643,
            "price": 988,
            "image": "https://code.s3.yandex.net/react/code/bun-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
        },
        {
            "_id": "643d69a5c3f7b9001cfa0946",
            "name": "Хрустящие минеральные кольца",
            "type": "main",
            "proteins": 808,
            "fat": 689,
            "carbohydrates": 609,
            "calories": 986,
            "price": 300,
            "image": "https://code.s3.yandex.net/react/code/mineral_rings.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
        },
        {
            "_id": "643d69a5c3f7b9001cfa093d",
            "name": "Флюоресцентная булка R2-D3",
            "type": "bun",
            "proteins": 44,
            "fat": 26,
            "carbohydrates": 85,
            "calories": 643,
            "price": 988,
            "image": "https://code.s3.yandex.net/react/code/bun-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
        }
        ],
        "_id": "667be890856777001bb1ddd9",
        "owner": {
        "name": "Ekaterina",
        "email": "e.deogenova@yandex.ru",
        "createdAt": "2024-06-12T08:45:15.912Z",
        "updatedAt": "2024-06-12T08:45:15.912Z"
        },
        "status": "done",
        "name": "Флюоресцентный минеральный бургер",
        "createdAt": "2024-06-26T10:08:16.201Z",
        "updatedAt": "2024-06-26T10:08:16.632Z",
        "number": 44329,
        "price": 2276
    }
}

describe('tests for orders in profile slice', () => {
    test("initializes correctly", () =>{
        const state = ordersSlice.reducer(undefined, { type: ""})
        expect(state).toEqual(initialState);
    })
    describe('test getOrders', () => {
        test('test getOrders pending', () => {
            const action = { type: getOrders.pending.type};
            const state = ordersSlice.reducer(initialState, action);
            expect(state).toEqual({...initialState, isLoading: true, error: ''});
        });
    
        test('test getOrders rejected', () => {
            const action = { type: getOrders.rejected.type, error: { message: "Test" } };
            const state = ordersSlice.reducer(initialState, action);
            expect(state).toEqual({...initialState, error: "Test", isLoading: false});
        });
    
        test('test getOrders fulfilled', () => {
            const action = { type: getOrders.fulfilled.type, payload: mockOrders };
            const state = ordersSlice.reducer(initialState, action);
            expect(state).toEqual({
                ...initialState, 
                orders: mockOrders, 
                isLoading: false,
                error: '' 
            });
        });
    })
    describe('test getOrder', () => {
        test('test getOrder pending', () => {
            const action = { type: getOrder.pending.type};
            const state = ordersSlice.reducer(initialState, action);
            expect(state).toEqual({...initialState, isLoading: true, error: ''});
        });
    
        test('test getOrder rejected', () => {
            const action = { type: getOrder.rejected.type, error: { message: "Test" } };
            const state = ordersSlice.reducer(initialState, action);
            expect(state).toEqual({...initialState, error: "Test", isLoading: false});
        });
    
        test('test getOrder fulfilled', () => {
            const action = { type: getOrder.fulfilled.type, payload: mockOrder };
            const state = ordersSlice.reducer(initialState, action);
            expect(state).toEqual({
                ...initialState, 
                orderData: mockOrder[0], 
                isLoading: false,
                error: '' 
            });
        });
    })
    describe('test orderBurger', () => {
        test('test orderBurger pending', () => {
            const action = { type: orderBurger.pending.type};
            const state = ordersSlice.reducer(initialState, action);
            expect(state).toEqual({...initialState, isLoading: true, error: ''});
        });
    
        test('test orderBurger rejected', () => {
            const action = { type: orderBurger.rejected.type, error: { message: "Test" } };
            const state = ordersSlice.reducer(initialState, action);
            expect(state).toEqual({...initialState, error: "Test", isLoading: false});
        });
    
        test('test orderBurger fulfilled', () => {
            const action = { type: orderBurger.fulfilled.type, payload: mockOrderBurger };
            const state = ordersSlice.reducer(initialState, action);
            expect(state).toEqual({
                ...initialState, 
                orderModalData: mockOrderBurger.order, 
                isLoading: false,
                error: '' 
            });
        });
    })
});
