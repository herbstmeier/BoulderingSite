export class User {
    userId: number;
    username: string;
    picture: string;
    isSetter: boolean;
    isAdmin: boolean;
    //canComment: boolean

    constructor(u?: User) {
        this.userId = u?.userId ?? -1;
        this.username = u?.username ?? '';
        this.picture = u?.picture ?? '';
        this.isSetter = u?.isSetter ?? false;
        this.isAdmin = u?.isAdmin ?? false;
    }
}

export class AuthUserModel {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}