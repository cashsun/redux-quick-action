const expect = require('chai').expect;
const QuickAction = require('../src/quickAction');
const QuickActionRelease = require('../release/quickAction');
function initialState(){
    return {
        id: 'foo'
    }
}

const login = (currentState, username, password)=> {
    return Object.assign({}, currentState, {
        username,
        password
    })
};

describe('quick action', ()=> {

    it('got correct uniq action type and converts to redux action', ()=> {

        var quickAction = new QuickAction('login', login);

        const actionType = quickAction.getActionType();

        console.log('generated action type:', actionType);

        const action = quickAction.toAction();

        const expectedAction = {
            type: actionType,
            payload: ['cash', '123456']
        };

        expect(/^login\/.+/.test(actionType)).to.equal(true);
        expect(action('cash', '123456')).to.deep.equal(expectedAction);

    });

    it('got correct uniq action type with namespace and converts to redux action', ()=> {

        var quickAction = new QuickAction('login', login, {namespace: 'foo'});

        const actionType = quickAction.getActionType();

        console.log('generated action type:', actionType);

        const action = quickAction.toAction();

        const expectedAction = {
            type: actionType,
            payload: ['cash', '123456']
        };

        expect(/^foo\/login\/.+/.test(actionType)).to.equal(true);
        expect(action('cash', '123456')).to.deep.equal(expectedAction);

    });

    it('converts reducer', ()=>{
        var quickAction = new QuickAction('login', login);

        const actionType = quickAction.getActionType();

        console.log('generated action type:', actionType);

        const reducer = quickAction.toReducer();

        const expectedAction = {
            type: actionType,
            payload: ['cash', '123456']
        };

        expect(reducer(initialState, expectedAction)).to.deep.equal(Object.assign({
            username: 'cash',
            password: '123456'
        }, initialState))
    });

    it('throws exception if quick action modifies previous state', ()=>{
        var quickAction = new QuickAction('login', (state, username, password)=>{
            return Object.assign(state, {
                username,
                password
            })
        }, {strict: true});

        const actionType = quickAction.getActionType();

        console.log('generated action type:', actionType);

        const reducer = quickAction.toReducer();

        const expectedAction = {
            type: actionType,
            payload: ['cash', '123456']
        };

        expect(reducer.bind(null, initialState(), expectedAction)).to.throw(TypeError, /object is not extensible/);
    });

    it('do not throw exception if initial state is null or undefined', ()=>{
        const quickAction = new QuickAction('login', (state, username, password)=>{
            return Object.assign({}, state, {
                username,
                password
            })
        }, {strict: true});

        const actionType = quickAction.getActionType();

        console.log('generated action type:', actionType);

        const reducer = quickAction.toReducer();

        const expectedAction = {
            type: actionType,
            payload: ['cash', '123456']
        };

        expect(reducer.bind(null, undefined, expectedAction)).to.not.throw(TypeError, /object is not extensible/);
    });

    it('throws no exception if quick action modifies previous state in non strict mode', ()=>{
        var quickAction = new QuickAction('login', (state, username, password)=>{
            return Object.assign(state, {
                username,
                password
            })
        });

        const actionType = quickAction.getActionType();

        console.log('generated action type:', actionType);

        const reducer = quickAction.toReducer();

        const expectedAction = {
            type: actionType,
            payload: ['cash', '123456']
        };

        expect(reducer(initialState(), expectedAction)).to.deep.equal(Object.assign({
            username: 'cash',
            password: '123456'
        }, initialState()));
    });

});

describe('quick action (release)', ()=> {

    it('got correct uniq action type and converts to redux action', ()=> {

        var quickAction = new QuickActionRelease('login', login);

        const actionType = quickAction.getActionType();

        console.log('generated action type:', actionType);

        const action = quickAction.toAction();

        const expectedAction = {
            type: actionType,
            payload: ['cash', '123456']
        };

        expect(/^login\/.+/.test(actionType)).to.equal(true);
        expect(action('cash', '123456')).to.deep.equal(expectedAction);

    });

    it('got correct uniq action type with name space and converts to redux action', ()=> {

        var quickAction = new QuickActionRelease('login', login, {namespace: 'foo'});

        const actionType = quickAction.getActionType();

        console.log('generated action type:', actionType);

        const action = quickAction.toAction();

        const expectedAction = {
            type: actionType,
            payload: ['cash', '123456']
        };

        expect(/^foo\/login\/.+/.test(actionType)).to.equal(true);
        expect(action('cash', '123456')).to.deep.equal(expectedAction);

    });

    it('converts reducer', ()=>{
        var quickAction = new QuickActionRelease('login', login);

        const actionType = quickAction.getActionType();

        console.log('generated action type:', actionType);

        const reducer = quickAction.toReducer();

        const expectedAction = {
            type: actionType,
            payload: ['cash', '123456']
        };

        expect(reducer(initialState(), expectedAction)).to.deep.equal(Object.assign({
            username: 'cash',
            password: '123456'
        }, initialState()))
    });

    it('throws exception if quick action (release) modifies previous state', ()=>{
        var quickAction = new QuickActionRelease('login', (state, username, password)=>{
            return Object.assign(state, {
                username,
                password
            })
        }, {strict: true});

        const actionType = quickAction.getActionType();

        console.log('generated action type:', actionType);

        const reducer = quickAction.toReducer();

        const expectedAction = {
            type: actionType,
            payload: ['cash', '123456']
        };

        expect(reducer.bind(null, initialState(), expectedAction)).to.throw(TypeError, /object is not extensible/);
    });


    it('do not throw exception if initial state is null or undefined', ()=>{
        const quickAction = new QuickActionRelease('login', (state, username, password)=>{
            return Object.assign({}, state, {
                username,
                password
            })
        }, {strict: true});

        const actionType = quickAction.getActionType();

        console.log('generated action type:', actionType);

        const reducer = quickAction.toReducer();

        const expectedAction = {
            type: actionType,
            payload: ['cash', '123456']
        };

        expect(reducer.bind(null, undefined, expectedAction)).to.not.throw(TypeError, /object is not extensible/);
    });

    it('throws no exception if quick action modifies previous state in non strict mode', ()=>{
        var quickAction = new QuickActionRelease('login', (state, username, password)=>{
            return Object.assign(state, {
                username,
                password
            })
        });

        const actionType = quickAction.getActionType();

        console.log('generated action type:', actionType);

        const reducer = quickAction.toReducer();

        const expectedAction = {
            type: actionType,
            payload: ['cash', '123456']
        };

        expect(reducer(initialState(), expectedAction)).to.deep.equal(Object.assign({
            username: 'cash',
            password: '123456'
        }, initialState()));
    });

});