/**
 * Validates an email address using a simple regex.
 * @param {string} email 
 * @returns {boolean}
 */
const validateEmail = (email) => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates a password (minimum 8 characters).
 * @param {string} password 
 * @returns {boolean}
 */
const validatePassword = (password) => {
    if (!password) return false;
    return password.length >= 8;
};

/**
 * Validates a username (alphanumeric, minimum 3 characters).
 * @param {string} username 
 * @returns {boolean}
 */
const validateUsername = (username) => {
    if (!username) return false;
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
    return usernameRegex.test(username);
};

module.exports = {
    validateEmail,
    validatePassword,
    validateUsername
};
