const expect = require('chai').expect;
const redux = require('redux');
const createStore = redux.createStore;
const deepfreeze = require('deep-freeze');
const QuickActions = require('../src/quickActions');
const QuickActionsRelease = require('../index');
const initialState = {
    id: 'foo'
};
const myActionMap = {
    login: (state, username, password)=> {
        return Object.assign({}, state, {
            username,
            password
        });
    },

    logout: (state)=> {
        return Object.assign({}, state, {
            username: null,
            password: null
        });
    },

    selectArticle: (state, articleId)=> {
        return Object.assign({}, state, {
            articleId
        });
    }
};
const myQuickActions = new QuickActions(initialState, myActionMap);
const myQuickActionsRelease = new QuickActionsRelease(initialState, myActionMap);


function getCleanStore(quickActions) {
    var store = createStore(quickActions.toReducer());
    deepfreeze(store.getState());
    return store;
}

const myActions = myQuickActions.toActions();
const myActionsRelease = myQuickActionsRelease.toActions();

describe('quick actions', ()=> {

    it('converts to correct actions and reducers', ()=> {
        const store = getCleanStore(myQuickActions);
        //login
        store.dispatch(myActions.login('cash', 123456));
        expect(store.getState()).to.deep.equal(Object.assign({
            username: 'cash',
            password: 123456
        }, initialState));

        //logout
        store.dispatch(myActions.logout());
        expect(store.getState()).to.deep.equal(Object.assign({
            username: null,
            password: null
        }, initialState));

        //selectArticle
        store.dispatch(myActions.selectArticle('article1'));
        expect(store.getState()).to.deep.equal(Object.assign({
            username: null,
            password: null,
            articleId: 'article1'
        }, initialState));

    });

});

describe('quick actions (release)', ()=> {

    it('converts to correct actions and reducers', ()=> {
        const store = getCleanStore(myQuickActionsRelease);
        //login
        store.dispatch(myActionsRelease.login('cash', 123456));
        expect(store.getState()).to.deep.equal(Object.assign({
            username: 'cash',
            password: 123456
        }, initialState));

        //logout
        store.dispatch(myActionsRelease.logout());
        expect(store.getState()).to.deep.equal(Object.assign({
            username: null,
            password: null
        }, initialState));

        //selectArticle
        store.dispatch(myActionsRelease.selectArticle('article1'));
        expect(store.getState()).to.deep.equal(Object.assign({
            username: null,
            password: null,
            articleId: 'article1'
        }, initialState));

    });

});