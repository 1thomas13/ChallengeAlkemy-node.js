import nodemailer from 'nodemailer'

export const sendEmailWelcome = async function (data) {
    const {email, username} = data
   
    let transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user:  process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
  
    
    await transport.sendMail({
      from: '"Disneyy" <disneyy@gmail.com>', 
      to: email, 
      subject: `welcome ${username}`, 
      text: "you can now explore the world of disney!", 
      html:`
      <p>Hola: ${username}, This is an alkemy challenge<p/>
      <p> 
        If you want you can contact me on linkedin
        <a href="https://www.linkedin.com/in/thomas-barreto-50ab71204/">
          Contact me
        <a/>
        <p>
            Mi github is 
            <a href="https://github.com/1thomas13">
                1thomas13
            <a/>
        <p/>
      </p>
    `
    });
  
  
}