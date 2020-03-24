const UserService = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const UserAuth = require('./auth');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {
    try {
        const data = {
            Access: req.cookies.Access,
            Refresh: req.cookies.Refresh,
        };
        const response = UserAuth.verify(data);
        if (response.status === 0) {
            const users = await UserService.findAll();
            return res.status(200).json({
                data: users,
            });
        }
        if (response.status === 1) {
            const accessData = {
                email: response.email,
            };
            const access = UserAuth.access_token(accessData);
            res.cookie('Access', access, { maxAge: 300000, httpOnly: true });
            const users = await UserService.findAll();
            return res.status(200).json({
                data: users,
            });
        }
        if (response === 2) {
            return res.redirect(307, '/login');
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            details: null,
        });

        next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findById(req, res, next) {
    try {
        const data = {
            Access: req.cookies.Access,
            Refresh: req.cookies.Refresh,
        };
        const response = UserAuth.verify(data);
        if (response.status === 0) {
            const { error } = UserValidation.findById(req.params);

            if (error) {
                throw new ValidationError(error.details);
            }

            const user = await UserService.findById(req.body.id);

            return res.status(200).json({
                data: user,
            });
        }
        if (response.status === 1) {
            const accessData = {
                email: response.email,
            };
            const access = UserAuth.access_token(accessData);
            res.cookie('Access', access, { maxAge: 300000, httpOnly: true });
            const { error } = UserValidation.findById(req.params);

            if (error) {
                throw new ValidationError(error.details);
            }

            const user = await UserService.findById(req.body.id);

            return res.status(200).json({
                data: user,
            });
        }
        if (response === 2) {
            return res.redirect(307, '/login');
        }
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function create(req, res, next) {
    try {
        const data = {
            Access: req.cookies.Access,
            Refresh: req.cookies.Refresh,
        };
        const response = UserAuth.verify(data);
        if (response.status === 0) {
            const { error } = UserValidation.create(req.body);

            if (error) {
                throw new ValidationError(error.details);
            }

            const user = await UserService.create(req.body);

            return res.status(200).json({
                data: user,
            });
        }
        if (response.status === 1) {
            const accessData = {
                email: response.email,
            };
            const access = UserAuth.access_token(accessData);
            res.cookie('Access', access, { maxAge: 300000, httpOnly: true });
            const { error } = UserValidation.create(req.body);

            if (error) {
                throw new ValidationError(error.details);
            }

            const user = await UserService.create(req.body);

            return res.status(200).json({
                data: user,
            });
        }
        if (response === 2) {
            return res.redirect(307, '/login');
        }
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function updateById(req, res, next) {
    try {
        const data = {
            Access: req.cookies.Access,
            Refresh: req.cookies.Refresh,
        };
        const response = UserAuth.verify(data);
        if (response.status === 0) {
            const { error } = UserValidation.updateById(req.body);

            if (error) {
                throw new ValidationError(error.details);
            }
            const newProfile = {
                fullName: req.body.fullName,
            };
            const updatedUser = await UserService.updateById(req.body.id, newProfile);

            return res.status(200).json({
                data: updatedUser,
            });
        }
        if (response.status === 1) {
            const accessData = {
                email: response.email,
            };
            const access = UserAuth.access_token(accessData);
            res.cookie('Access', access, { maxAge: 300000, httpOnly: true });
            const { error } = UserValidation.updateById(req.body);

            if (error) {
                throw new ValidationError(error.details);
            }
            const newProfile = {
                fullName: req.body.fullName,
            };
            const updatedUser = await UserService.updateById(req.body.id, newProfile);

            return res.status(200).json({
                data: updatedUser,
            });
        }
        if (response === 2) {
            return res.redirect(307, '/login');
        }
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById(req, res, next) {
    try {
        const data = {
            Access: req.cookies.Access,
            Refresh: req.cookies.Refresh,
        };
        const response = UserAuth.verify(data);
        if (response.status === 0) {
            const { error } = UserValidation.deleteById(req.body);

            if (error) {
                throw new ValidationError(error.details);
            }

            const deletedUser = await UserService.deleteById(req.body.id);

            return res.status(200).json({
                data: deletedUser,
            });
        }
        if (response.status === 1) {
            const accessData = {
                email: response.email,
            };
            const access = UserAuth.access_token(accessData);
            res.cookie('Access', access, { maxAge: 300000, httpOnly: true });
            const { error } = UserValidation.deleteById(req.body);

            if (error) {
                throw new ValidationError(error.details);
            }

            const deletedUser = await UserService.deleteById(req.body.id);

            return res.status(200).json({
                data: deletedUser,
            });
        }
        if (response === 2) {
            return res.redirect(307, '/login');
        }
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function logIn(req, res, next) {
    try {
        const { error } = UserValidation.logIn(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const data = {
            email: req.body.email,
        };
        const refresh = UserAuth.refresh_token(data);
        const access = UserAuth.access_token(data);
        const update = UserService.logIn(data.email, refresh);

        res.cookie('Access', access, { maxAge: 300000, httpOnly: true });
        res.cookie('Refresh', refresh, { maxAge: 86400000, httpOnly: true });

        return res.status(200).json({
            data: update,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}


/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function signUp(req, res, next) {
    try {
        const { error } = UserValidation.signUp(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }
        const user = await UserService.signUp(req.body);
        return res.status(200).json({
            data: user,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function logOut(req, res, next) {
    try {
        const data = {
            Access: req.cookies.Access,
            Refresh: req.cookies.Refresh,
        };
        const response = UserAuth.verify(data);
        if (response.status === 0) {
            await UserService.logOut(response.email);
            res.cookie('Access', ' ', { maxAge: new Date().getTime(), httpOnly: true });
            res.cookie('Refresh', ' ', { maxAge: new Date().getTime(), httpOnly: true });
            return res.status(200).json({
                message: 'log out',
            });
        }
        if (response.status === 1) {
            const accessData = {
                email: response.email,
            };
            const access = UserAuth.access_token(accessData);
            res.cookie('Access', access, { maxAge: 300000, httpOnly: true });
            await UserService.logOut(response.email);
            res.cookie('Access', ' ', { maxAge: new Date().getTime(), httpOnly: true });
            res.cookie('Refresh', ' ', { maxAge: new Date().getTime(), httpOnly: true });
            return res.status(200).json({
                message: 'log out',
            });
        }
        if (response === 2) {
            return res.redirect(307, '/login');
        }
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    logIn,
    signUp,
    logOut,
};
