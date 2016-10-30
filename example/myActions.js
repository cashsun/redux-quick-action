import myQuickActions from './myQuickActions';
import fetch from 'whatwg-fetch';

const { setUser, startLoading, finishLoading } = myQuickActions.toActions();

//writing more complex async actions using sync actions generated from your quick-actions.
function loadUser(userId) {
    startLoading(); //i.e. dispatch start loading redux event

    fetch(`/api/users/${userId}`)
        .then(response => {
            return response.json()
        })
        .then(user => {
            setUser(user.username, userId); //notice here you are using the generated actions, no need for state.
        })
        .finally(()=>{
            finishLoading(); //dispatch finish loading redux event
        });
}

export {
    setUser,
    startLoading,
    finishLoading,
    loadUser
}