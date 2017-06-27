'use strict';
import cookie from 'react-cookie';
import {COOKIE} from 'config';

let cookiePath = {path: '/'};

module.exports = {

	saveCookie(name, value) {
		cookie.save(name, value, cookiePath);
	},

	getCookie(name) {
		return cookie.load(name, cookiePath);
	},

	removeCookie(name) {
		cookie.remove(name, cookiePath);
	},

	logout() {
		cookie.remove(COOKIE, cookiePath);
	},

	login(at, rt, cd) {

	},

	loggedIn() {
		return !!cookie.load(COOKIE, cookiePath);
	}

};
