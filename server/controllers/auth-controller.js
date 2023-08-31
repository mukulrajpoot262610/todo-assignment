const userService = require("../services/user-service");
const tokenService = require("../services/token-service");
const APIResponse = require("../helpers/APIResponse");
const { setTokensInCookie } = require("../helpers/index");


class AuthController {

    async registerUser(req, res) {
        const { username, email, password } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ msg: "All Fields are required" });
        }

        try {
            let user = await userService.findUser({ email }) || await userService.findUser({ username });

            if (user) {
                return res.status(400).json({ msg: "User Already Exist" });
            } else {
                user = await userService.createUser({ username, email, password });
            }

            // generate new token
            const { accessToken, refreshToken } = tokenService.generateToken({
                _id: user._id,
            });

            // save refresh token in db
            const savedToken = tokenService.storeRefreshToken(
                refreshToken,
                user._id,
            );

            if (!savedToken) {
                return APIResponse.errorResponse(res);
            }

            setTokensInCookie(res, { accessToken, refreshToken });
            user.password = null;
            return APIResponse.successResponseWithData(res, user, "User Created");

        } catch (err) {
            console.log(err);
            APIResponse.errorResponse(res);
        }
    }

    async loginUser(req, res) {
        const { username, password } = req.body;

        if (!password || !username) {
            return APIResponse.validationError(res);
        }

        try {

            let user = await userService.findUser({ username });

            if (!user) {
                return APIResponse.validationError(res, "Wrong Credentials");
            }

            if (user.password !== password) {
                return APIResponse.validationError(res, "Wrong Credentials");
            }


            // generate new token
            const { accessToken, refreshToken } = tokenService.generateToken({
                _id: user._id,
            });

            // save refresh token in db
            const savedToken = tokenService.storeRefreshToken(
                refreshToken,
                user._id
            );

            if (!savedToken) {
                return APIResponse.errorResponse(res);
            }

            setTokensInCookie(res, { accessToken, refreshToken });
            user.password = null;
            return APIResponse.successResponseWithData(res, user, "Logged In");

        } catch (err) {
            console.log(err);
            APIResponse.errorResponse(res);
        }
    }

    async logout(req, res) {
        const { refreshCookie } = req.cookies;
        await tokenService.removeToken(refreshCookie);

        res.clearCookie("refreshCookie");
        res.clearCookie("accessCookie");
        res.json({ user: null, auth: false });
    }
}

module.exports = new AuthController();