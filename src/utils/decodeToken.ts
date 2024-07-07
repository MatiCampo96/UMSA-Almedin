const decodeToken = (token: string) => {
  try {
    const tokenParts = token.split(".");
    const encodedPayload = tokenParts[1];
    const decodedPayload = atob(encodedPayload);
    const payload = JSON.parse(decodedPayload);
    return payload.groups[0]; // Adjust according to the structure of your token
  } catch (error) {
    return null;
  }
};

export default decodeToken;
