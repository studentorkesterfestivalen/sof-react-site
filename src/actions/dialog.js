export const OPEN_DIALOG  = 'OPEN_DIALOG ';
export const CLOSE_DIALOG  = 'CLOSE_DIALOG ';

export function openDialog(title, text) {
	return {
		type: OPEN_DIALOG,
    title, 
    text,
	}
}

export function closeDialog() {
	return {
		type: CLOSE_DIALOG,
	}
}
