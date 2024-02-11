const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");

exports.register = async (req,res,next) => {
    const {firstname,lastname,username,password,phone,email,address} = req.body;
    try{
        if (!(firstname && lastname && username && password && phone && email && address )) {
            return next(new Error("Fulfill all inputs"));
          }
        const hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);
        const data = {
            firstname,
            lastname,
            username,
            password: hashedPassword,
            phone,
            email,
            address
            
        };

        const rs = await db.user.create({data})
        console.log(rs);

        res.json({ msg: 'Register successful' })
    }catch (err) {
        next(err);
    }
}


exports.login = async (req, res, next) => {
    const{username, password} = req.body;
    try{
        if(!(username.trim() && password.trim())){
            throw new Error('username or password must not blank');
    }

    const user = await db.user.findFirstOrThrow({where : {username}});
    const pwOk = await bcrypt.compare(password, user.password)
    if(!pwOk) {
      throw new Error('invalid login')
    }
 
    const payload = { id: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30d'
    })
    console.log(token)
    res.json({token : token})

}catch(err){
    next(err)
}

};

exports.getme = (req,res,next) => {
    res.json(req.user)
  }

