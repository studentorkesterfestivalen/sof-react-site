export const SET_LOCALE = 'SET_LOCALE';

export function setLocale(lang) {
	return {
		type: SET_LOCALE,
		lang,
	}
}