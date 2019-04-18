import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (idToken, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: idToken,
		userId: userId
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};

export const authLogout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	localStorage.removeItem('email');
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};
export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(authLogout());
		}, expirationTime * 1000);
	};
};

export const auth = (email, password, isSignup) => {
	return (dispatch) => {
		dispatch(authStart());
		let URL =
			'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDutyh3MQSQI_Du4FRSvPU7XAYwVTOBVfQ';
		if (!isSignup) {
			URL =
				'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDutyh3MQSQI_Du4FRSvPU7XAYwVTOBVfQ';
		}
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		axios
			.post(URL, authData)
			.then((response) => {
				const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('expirationDate', expirationDate);
				localStorage.setItem('userId', response.data.localId);
				dispatch(authSuccess(response.data.idToken, response.data.localId));
				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.then()
			.catch((error) => dispatch(authFail(error.response.data.error)))
			.catch((err) => {
				err.message = 'Some error occured check internet connection';
				dispatch(authFail(err.message));
			});
	};
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(authLogout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()) {
				dispatch(authLogout());
			} else {
				const userId = localStorage.getItem('userId');
				dispatch(authSuccess(token, userId));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
			}
		}
		dispatch(setAuthInitialized());
	};
};

export const setAuthInitialized = () => {
	return {
		type: actionTypes.SET_AUTH_INITIALIZED
	};
};
