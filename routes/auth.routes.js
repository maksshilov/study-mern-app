const { Router } = require("express")
const bcryptjs = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const { check, validationResult } = require("express-validator")
const User = require("../models/User")
const router = Router()

// /api/auth...
router.post(
	"/signup",
	[
		check("email", "Wrong email").isEmail(),
		check("password", "Password min length is 6 symbols").isLength({ min: 6 }),
	],
	async (req, res) => {
		try {
			// console.log("BODY >>>", req.body);

			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: "Wrong inputs in sign up",
				})
			}

			const { email, password } = req.body

			const candidate = await User.findOne({ email })

			if (candidate) {
				res.status(400).json({ message: "User with the same email is already exists." })
				return
			}

			const hashedPassword = await bcryptjs.hash(password, 12)
			const user = new User({ email, password: hashedPassword })

			await user.save()

			res.status(201).json({ message: "User has been created" })
		} catch (error) {
			res.status(500).json({ message: "Smth goes wrong... Try again" })
		}
	}
)

// /api/auth...
router.post(
	"/login",
	[check("email", "Type correct e-mail").normalizeEmail().isEmail(), check("password", "Type password").exists()],
	async (req, res) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: "Wrong inputs in log in",
				})
			}

			const { email, password } = req.body

			const user = await User.findOne({ email })

			if (!user) {
				return res.status(400).json({ message: "User was not find" })
			}

			const isMatch = await bcryptjs.compare(password, user.password)

			if (!isMatch) {
				return res.status(400).json({ message: "Wrong password" })
			}

			const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
				expiresIn: "1h",
			})

			res.json({ token, userId: user.id })
		} catch (error) {
			res.status(500).json({ message: "Smth goes wrong... Try again" })
		}
	}
)

module.exports = router
