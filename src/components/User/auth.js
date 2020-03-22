require('dotenv').config();
const jwt = require('jsonwebtoken');

const privateKey = process.env.KEY;

function refresh_token(data) {
    return jwt.sign({ email: data.email, fullName: data.fullName }, privateKey, { expiresIn: '24h' });
}

function access_token(data) {
    return jwt.sign({ email: data.email, fullName: data.fullName }, privateKey, { expiresIn: '5m' });
}

function verify(token) {
    try {
        const refresh = jwt.verify(token.Refresh, process.env.KEY);
        try {
            const access = jwt.verify(token.Access, process.env.KEY);
            if (refresh && access) {
                return { status: 0, email: access.email };
            }
        } catch (err) {
            console.error(err);
            return { status: 1 };
        }
    } catch (err) {
        console.error(err);
        return { status: 2 };
    }
}

module.exports = {
    refresh_token,
    access_token,
    verify,
};
