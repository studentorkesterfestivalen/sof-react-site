import { ACCOUNT_POPUP_OPEN } from '../actions/login'

const accountPopup = (state = { accountPopupOpen: false }, action) => {
	switch (action.type) {
		case ACCOUNT_POPUP_OPEN:
			return {...state, accountPopupOpen: action.isOpen }
		default: 
			return state;
	}
}

export default accountPopup;
