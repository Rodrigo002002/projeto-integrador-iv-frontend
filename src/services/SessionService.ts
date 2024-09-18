import { Cookies } from 'react-cookie';
import { CookieSetOptions } from 'universal-cookie/cjs/types';
import { store } from '@/store';
import {
    toggleAnimation,
    toggleLayout,
    toggleMenu,
    toggleNavbar,
    toggleRTL,
    toggleSemiDark,
    toggleTheme
} from '@/store/slices/themeConfig';
import themeConfig from '@/theme.config';
import { IAuthenticatedUser } from '@/types/IUsuario';

const cookies = new Cookies();

const getCookieConf = (): CookieSetOptions => {
    return {
        path: '/',
        secure: true,
        sameSite: 'strict'
    };
};

export const getAccessToken = () => {
    return cookies.get('accessToken');
};

export const getRefreshToken = () => {
    return cookies.get('refreshToken');
};

export const setAccessToken = (token: string) => {
    cookies.set('accessToken', token, getCookieConf());
};

export const setRefreshToken = (token: string) => {
    cookies.set('refreshToken', token, getCookieConf());
};

export const removeTokens = () => {
    cookies.remove('accessToken', { path: '/' });
    cookies.remove('refreshToken', { path: '/' });
    localStorage.removeItem('theme');
    localStorage.clear();
};

export const setUserData = (data: IAuthenticatedUser) => {
    localStorage.setItem('userData', JSON.stringify(data));
};

export const setTheme = (data?: any) => {
    if (data) {
        store.dispatch(toggleTheme(data.theme));
        store.dispatch(toggleMenu(data.menu));
        store.dispatch(toggleSemiDark(data.semiDark));
        store.dispatch(toggleLayout(data.layout));
        store.dispatch(toggleRTL(data.rtlClass));
        store.dispatch(toggleNavbar(data.navbar));
        store.dispatch(toggleAnimation(data.animation ? data.animation : ' '));
    }
};

export const resetTheme = () => {
    setTheme(themeConfig.theme);
};
