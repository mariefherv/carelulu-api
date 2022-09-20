const db = require('../index');
const bcrypt = require("bcrypt");
const auth = require("../auth");

// register new user
module.exports.register = (req,res) => {
    let email = req.body.email;

	let sql = 'SELECT * FROM user WHERE email=?'

	db.query(sql, email, (err,result) => {
		if(err) throw err;
        // if email isn't used yet, continue registration
		if(result.length === 0){
            const hashedPw = bcrypt.hashSync(req.body.password,10)

            let user = {
                full_name:req.body.full_name,
                email:req.body.email,
                password:hashedPw
            }

            sql = 'INSERT INTO user SET ?'

            db.query(sql, user, (err,result) => {
                if(err) throw err;
                res.send(true)
            })
        } else {
            res.send("Email already exists!")
        }
	}
	)
}
	
// login new user
module.exports.login = (req,res) => {
    let email = req.body.email;

	let sql = 'SELECT * FROM user WHERE email=?'

	db.query(sql, email, (err,result) => {
		if(err) throw err;
        // if user exists, compare password
		if(result.length === 1){
            foundUser = result[0]

            const isPasswordCorrect = bcrypt.compareSync(req.body.password,foundUser.password)

            isPasswordCorrect ? res.send({accessToken: auth.createAccessToken(foundUser)}) : res.send("Incorrect Password")
        } else {
            res.send("User not found")
        }
	}
	)
}