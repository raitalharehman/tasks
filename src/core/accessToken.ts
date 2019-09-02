import Cookies from 'js-cookie';
import keys from './keys';

export function accessTokenGet() {
    return Cookies.get(keys.accessToken);
}
export function accessTokenSet(id: string) {
    Cookies.set(keys.accessToken, id, { expires: 365 })
}
export function accessTokenDelete() {
    Cookies.remove(keys.accessToken)
}