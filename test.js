var crypto  = require('crypto')

function sha256Hash(str) {
    return crypto.createHash('sha256').update(str).digest('hex').slice(0, 8);
}

const getSimpleHash =(str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // converts to 32bit integer
  }
  return Math.abs(hash).toString(16);
}
