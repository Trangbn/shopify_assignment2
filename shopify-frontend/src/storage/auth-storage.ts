"use client";
import { TOKEN_KEY } from './constants';

export const authStorage = {
    get() {
        if (localStorage){
            return localStorage.getItem(TOKEN_KEY) ?? ""
        }
        return  ""
    },
    set(token: string) {
        if (localStorage){
            localStorage.setItem(TOKEN_KEY, token);
        }

    },
    reset() {
        if (localStorage){
            localStorage.setItem(TOKEN_KEY, '');
        }
    }
};
