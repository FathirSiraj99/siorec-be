
const signUp = async (req, res) => {
    const { username, password, confirmPassword } = req.body
    try {
        if (password != confirmPassword) {
            return res.status(400).json({ msg: "Password Not Match" })
        }
        const isUserValid = await usersLogin.findFirst({
            where: {
                username: username
            }
        })
        if (!isUserValid) {
            const createUsername = username
            // const hashPassword = await bycrypt.hash(password, 10)

            const data = await usersLogin.create({
                datas: {
                    username: createUsername,
                    password: bcrypt.hashSync(req.body.password, 8),
                }
            }).then()

            res.json({ msg: "Success Register" })
        } else {
            return res.status(400).json({ msg: "User Is Available, try another username" })
        }
    } catch (error) {
        console.log(error)
    }
}