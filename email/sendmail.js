const transporter = require('./transport');

 const sendMail = (to, subject, message) => {
    return transporter.sendMail({
      from:'demoironhack@gmail.com',
      to, 
      subject, 
      text: subject,
      html: `<a href="http://localhost:3000/auth/confirm/${message}">confirm your email<a>
      <p>or copy this url in your navigator localhost:3000/auth/confirm/${message}`
    })
    .then(info => console.log(info)).catch(e=>console.log(e))
  }
  
 module.exports = sendMail 