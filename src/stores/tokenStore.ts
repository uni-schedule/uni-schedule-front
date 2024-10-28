export enum TokenType {
    ACCESS = "access_token",
    REFRESH = "refresh_token"
}

export interface ITokens {
    access_token: string | null
    refresh_token: string | null
}

export function getTokens(): ITokens {
    return {
        access_token: localStorage.getItem(TokenType.ACCESS) || null,
        refresh_token: localStorage.getItem(TokenType.REFRESH) || null
    }
}

export function setTokens(tokens: ITokens) {
    localStorage.setItem(TokenType.ACCESS, tokens.access_token || "")
    localStorage.setItem(TokenType.REFRESH, tokens.refresh_token || "")
}

export function clearTokens() {
    localStorage.removeItem(TokenType.ACCESS)
    localStorage.removeItem(TokenType.REFRESH)
}