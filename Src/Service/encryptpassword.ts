import bcrypt from 'bcrypt';

export default async (password: string): Promise<string> => {

    try {

        const encrypted = await bcrypt.hash(password, 10);
        return encrypted;

    } catch (e) {

        throw e;

    }

}
