export default class authModule  {
    
    static hashPassword(password: string): string {
        const hashedPassword = Bun.password.hashSync(password);
        return hashedPassword;
    }

    static verifyPassword(password: string, hash: string): boolean {
        const isPasswordValid = Bun.password.verifySync(password, hash);
        return isPasswordValid;
    }
    
}