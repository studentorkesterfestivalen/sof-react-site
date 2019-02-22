import { SET_TITLE } from '../actions/title'

const title = (state = { title: ''}, action) => {
	switch (action.type) {
		case SET_TITLE:
			return {...state, title: action.title }
		default: 
			return state;
	}
}

export default title;