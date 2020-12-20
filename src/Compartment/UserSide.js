import {extendObservable} from 'mobx';

class UserSide{
    constructor(){
        extendObservable(this, {
            loading:false,
            isLoggedIn: false,
            username: ''
        })
    }
}
export default new UserSide();