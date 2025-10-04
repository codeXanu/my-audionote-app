import jwt from "jsonwebtoken";


export const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export function createToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
