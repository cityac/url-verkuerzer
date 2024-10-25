import crypto from 'crypto'

export const getSha256Hash =async (str: string, length = 8) => {
  return await crypto.createHash('sha256').update(str).digest('hex').slice(0, length);
}

export const getSimpleHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // converts to 32bit integer
    }
    return Math.abs(hash).toString(16);
}

