const jwt = require("jsonwebtoken");
export function isTokenExpired(token: string) {
  try {
    const decoded = jwt.decode(token);

    if (!decoded || !decoded.exp) {
      return true; // Invalid token
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime; // Token is expired if current time is greater than expiry time
  } catch (error) {
    return true; // Token is invalid or other error occurred
  }
}
