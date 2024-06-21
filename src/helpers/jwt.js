import jwt from "jsonwebtoken";

// Middleware function for JWT authentication
export const jwtAuthMiddleware = (req, res, next) => {
  // Incorrectly placed export statement, should not be here
  const authorization = req.headers.authorization;

  // Check if the authorization header is present
  if (!authorization)
    return res.status(401).json({ error: "Token not found." });

  // Extract the token from the authorization header
  const token = req.headers.authorization.split(" ")[1];
  // Check if the token exists
  if (!token) return res.status(401).json({ error: "Unauthorized." });

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the decoded user information to the request object
    req.user = decoded;
    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Log the error message for debugging
    console.log(error.message);
    // Respond with an error if the token is invalid
    res.status(401).json({ error: "Invalid token" });
  }
};

// Function to generate a JWT token for the given user data
export const generateToken = (userData) => {
  // Sign the token with the user data and secret key, set the expiration time
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 30000 });
};
