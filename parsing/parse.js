const crypto = require("crypto");
module.exports = {
    // method for turning the user given password into an unreadable hash, for security
    getHashedPassword: (password) => {
        const sha256 = crypto.createHash("sha256");
        const hash = sha256.update(password).digest("base64");
        return hash;
    },
    generateAuthToken: () => {
        return crypto.randomBytes(30).toString("hex");
    }
};