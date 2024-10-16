import jwt from 'jsonwebtoken';
import crypto from "crypto";
import { User } from '@prisma/client';
import { AppError } from '../utils/AppError';

const JWT_SECRET = "123456";
const ENCRYPTION_KEY = process.env.JWT_SECRET || "pitokganteng121203";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "pitokganteng121203";

export const generateToken = (user: User) => {
    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "1m" })
    return encrypToken(token);
}

export const generateRefreshToken = (user: User) => {
    const refreshToken = jwt.sign({ user }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
    return encrypToken(refreshToken);
}

export const refreshTokenJwt = (refreshToken: string) => {
    const token = decryptToken(refreshToken);
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '';
    return jwt.verify(token, JWT_REFRESH_SECRET, (err, data: any) => {
        if (err) throw new AppError("Invalid refresh token", 403);
        return generateToken(data.user);
    });
}

export const verifyToken = (encryptedToken: string) => {
    try {
        // Dekripsi token terlebih dahulu
        const decryptedToken = decryptToken(encryptedToken);

        // Verifikasi token JWT
        return jwt.verify(decryptedToken, JWT_SECRET);
    } catch (error: any) {
        throw new Error('Token verification failed: ' + error.message);
    }
}

const encrypToken = (token: string) => {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-ccm', ENCRYPTION_KEY, iv, {
        authTagLength: 16
    });
    let encryted = cipher.update(token, 'utf8', 'hex');
    encryted += cipher.final('hex');
    return iv.toString('hex') + ':' + encryted + ":" + cipher.getAuthTag().toString('hex');
}

export const decryptToken = (encryptedToken: string) => {
    try {
        const [ivHex, encryptedText, authTagHex] = encryptedToken.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');

        const decipher = crypto.createDecipheriv('aes-256-ccm', ENCRYPTION_KEY, iv, {
            authTagLength: 16
        });
        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (error: any) {
        throw new Error('Failed to decrypt token: ' + error.message);
    }
}
