function register(req, res) {
  res.send("register user");
}

function login(req, res) {
  res.send("login user");
}

function checkUser(req, res) {
  res.send("check user");
}

module.exports = {
  register,
  login,
  checkUser,
};
