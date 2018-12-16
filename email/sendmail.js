const transporter = require('./transport');

 const sendMail = (to, subject, message) => {
    return transporter.sendMail({
      from:'demoironhack@gmail.com',
      to, 
      subject, 
      text: subject,
      html: `<p>Account successfully created</p> `
    })
    .then(info => console.log(info)).catch(e=>console.log(e))
  }
  
 module.exports = sendMail 