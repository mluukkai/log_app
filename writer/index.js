const fs = require('fs');
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const randomString = generateRandomString(20);

const doOutput = () => {
  console.log(new Date().toISOString() + ': ' + randomString);
  fs.writeFileSync('data/output.txt', new Date().toISOString() + ': ' + randomString + '\n');
};

doOutput();
setInterval(() => {
  doOutput();
}, 4000);
