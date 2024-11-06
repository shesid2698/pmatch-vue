import jwt from 'jsonwebtoken';

export default defineEventHandler(event => {
    const jwtToken = getCookie(event, 'u_token');

    try {
        const { data: userInfo } = jwt.verify(jwtToken, 'cxzd8s7af8e67w8q90d89s9a0');
        return {
            user: userInfo.user,
        };
    } catch (e) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        });
    }
});
