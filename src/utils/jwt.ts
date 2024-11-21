import jwt from 'jsonwebtoken';

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    } catch (err) {
        return null;
    }
};