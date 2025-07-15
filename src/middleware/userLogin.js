const UserLogin = (req, res) => {
    const login = req.query.login;

    if (login === "xyz") {
        res.status(200).json("User LoggedIn Successfully!");
    } else {
        res.status(404).json("Please check your credentials");
    }
};

module.exports = UserLogin;
