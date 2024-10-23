import jwt from 'jsonwebtoken';
export default defineEventHandler(async event => {
    const body = await readBody(event);
    const jwtTokenPayload = {
        user: body,
    };
    // const jwtTokenPayload = body.Data;

    //一個月
    const maxAge = 60 * 60 * 24 * 7 * 4;
    const expires = Math.floor(Date.now() / 1000) + maxAge;

    const jwtToken = jwt.sign(
        {
            exp: expires,
            data: jwtTokenPayload,
        },
        'cxzd8s7af8e67w8q90d89s9a0'
    );

    setCookie(event, 'u_token', jwtToken, {
        maxAge,
        expires: new Date(expires * 1000),
        secure: true,
        path: '/',
    });

    return "登入成功";
});
