import { OPEN_DIALOG, CLOSE_DIALOG } from '../actions/dialog'

const initialState = {
  open: false,
  title: "",
  text: ""
}

const dialog = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_DIALOG:
			return {...state, open: true, title: action.title, text: action.text}
		case CLOSE_DIALOG:
			return {...state, open: false}
		default: 
			return state;
	}
}

export default dialog;
