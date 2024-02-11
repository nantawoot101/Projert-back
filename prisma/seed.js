const bcrypt = require('bcryptjs')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const password = bcrypt.hashSync('123456')
const userData = [
    {
        firstname: "iii",
        lastname : "dy" ,
        username: "fioz",
        password: password,
        phone: "0613398749",
        email: "maos@gmail.com",
        address : "...",
        role : "User"
        
      }
]



const run = async () => {
  await prisma.user.createMany({
    data : userData
  })
}

run()