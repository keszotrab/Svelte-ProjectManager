import { json, type RequestHandler } from '@sveltejs/kit';
import jwt, { type JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const JWT_EXPIRES_IN = '8h'; // Czas ważności tokenu JWT
const REFRESH_TOKEN_EXPIRES_IN = '7d'; // Czas ważności refreshToken

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { refreshToken } = await request.json();

        if (!refreshToken) {
            return json({ error: 'Refresh token is required' }, { status: 400 });
        }

        const decoded = jwt.verify(refreshToken, JWT_SECRET) as JwtPayload;

        if (!decoded) {
            return json({ error: 'Invalid refresh token' }, { status: 401 });
        }

        // Generowanie nowego tokenu JWT
        const newToken = jwt.sign(
            {
                id: decoded.id,
                role: decoded.role
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return json({ token: newToken }, { status: 200 });

    } catch (error) {
        console.error(error);
        return json({ error: 'Invalid or expired refresh token' }, { status: 401 });
    }
};
