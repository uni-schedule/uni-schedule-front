import api from "../api";
import {setTokens} from "../stores/tokenStore.ts";

const AuthService = {
    async login(username: string, password: string) {
        const response = await api.Auth.authLogin({
            username,
            password
        })
        setTokens({
            access_token: response.data.access_token!,
            refresh_token: response.data.refresh_token!
        })
    },

    async register(username: string, password: string) {
        const response = await api.Auth.authRegister({
            username,
            password
        })
        setTokens({
            access_token: response.data.access_token!,
            refresh_token: response.data.refresh_token!
        })
    }
}
export default AuthService