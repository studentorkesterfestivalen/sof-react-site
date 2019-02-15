export const ACCOUNT_POPUP_OPEN = 'ACCOUNT_POPUP_OPEN';

export function setAccountPopupOpen(isOpen) {
	return {
		type: ACCOUNT_POPUP_OPEN,
		isOpen,
	}
}
