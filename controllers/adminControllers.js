const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Admin = require("../models/Admin")

exports.showLoginPage = (req, res) => {
  res.render("adminLogin")
}

exports.createAdmin = async (req, res) => {
  try {
    await Admin.create({
      username: "admins",
      password: await bcrypt.hash("123", 10)
    })

    res.send("Admin created")
  } catch (err) {
    res.status(500).send("Admin creation failed")
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body

  const admin = await Admin.findOne({ username })
  if (!admin)
    return res.render("adminLogin", { error: "User not found" })

  const isMatch = await bcrypt.compare(password, admin.password)
  if (!isMatch)
    return res.render("adminLogin", { error: "Password incorrect" })

  const token = jwt.sign(
    { id: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.cookie("token", token, {
    httpOnly: true
  })

  res.redirect("/ration")
}

exports.logout = (req, res) => {
  res.clearCookie("token")
  res.redirect("/admin/login")
}
