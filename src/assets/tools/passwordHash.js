export function encryptPass(password) {
  const bcrypt = require("bcryptjs");
  const saltRounds = 2;
  
  const result = bcrypt.hash(password, saltRounds).then(function(hash) {
    console.log(hash);
    return(hash)
  });

  return result
}


export function checkPass(password,hash) {
  const bcrypt = require("bcryptjs")
  return bcrypt.compareSync(password, hash)
}