import jwt from "jsonwebtoken";

export default defineEventHandler((event) => {
    // 獲取查詢參數（例如 strUserName 和 iExpireMinutes）
    const query = getQuery(event);
    const strUserName = query.strUserName;
    const iExpireMinutes = parseInt(query.iExpireMinutes);

    // 對應 C# 的密鑰 (Base64 格式)
    const m_strSecret = "WmlIYWkgSldUIFNlY3JldCBLZXkgNTA5MjIzMTAgMjAyMw=="; // 替換為實際密鑰
    const symmetricKey = Buffer.from(m_strSecret, "base64");

    console.log(" -- symmetricKey" + " " + symmetricKey);
    // Payload 與過期時間設置
    const payload = {
        unique_name: strUserName,
    };
    const options = {
        algorithm: "HS256",
        expiresIn: `${iExpireMinutes}m`, // 設置過期時間
        notBefore: "0s", // 對應 `NotBefore`
    };

    // 生成 Token
    const token = jwt.sign(payload, symmetricKey, options);

    // 返回 Token
    return { token };
});
