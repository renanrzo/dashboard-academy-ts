import { User, getUserByEmail } from "./UserService";

export interface User {
    email: string;
    password: string;
}

<<<<<<< HEAD
export const login = async (User: User): Promise<User> => {
    const response = await api.post<User>("/auth/login", User);
    return response.data;
=======
export const login = async (loginData: LoginData): Promise<User> => {
    const user = await getUserByEmail(loginData.email);

    if (user && user.password === loginData.password) {
        return user;
    } else {
        throw new Error ("Email e/ou password inválido(s).");
    }
>>>>>>> parent of 22a28d6 (update 31-05-2023)
}