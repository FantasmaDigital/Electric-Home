import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface MailData {
  name: string;
  email: string;
  company?: string;
  location: string;
  serviceType: string;
  priority: string;
  message: string;
}

export const sendContactEmails = async (data: MailData) => {
  const { name, email, company, location, serviceType, priority, message } = data;

  // 1. Email to Admin
  const adminMailOptions = {
    from: `"Electric Home Bot" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_ADMIN,
    subject: `Nueva Solicitud: ${serviceType.toUpperCase()} - ${name}`,
    html: `
      <div style="font-family: sans-serif; color: #050505; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #FF6321; border-bottom: 2px solid #FF6321; padding-bottom: 10px;">Nueva Solicitud de Servicio</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Empresa/Hogar:</strong> ${company || 'N/A'}</p>
        <p><strong>Ubicación:</strong> ${location}</p>
        <p><strong>Tipo de Servicio:</strong> ${serviceType}</p>
        <p><strong>Prioridad:</strong> <span style="color: ${priority === 'crítica' ? 'red' : 'inherit'}; font-weight: bold;">${priority.toUpperCase()}</span></p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        </div>
      </div>
    `,
  };

  // 2. Email to Client (Confirmation)
  const clientMailOptions = {
    from: `"Electric Home" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Recibimos tu solicitud - Electric Home`,
    html: `
      <div style="font-family: sans-serif; color: #050505; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #FF6321; margin: 0;">Electric Home</h1>
          <p style="text-size: 0.8em; color: #525660; margin: 5px 0 0 0;">Ingeniería Eléctrica de Alta Fidelidad</p>
        </div>
        
        <p>Hola <strong>${name}</strong>,</p>
        <p>Gracias por contactar a Electric Home. Hemos recibido con éxito tu solicitud para el servicio de <strong>${serviceType}</strong>.</p>
        
        <p>Nuestro equipo técnico revisará los detalles y se pondrá en contacto contigo en un plazo máximo de 24 horas laborables.</p>
        
        ${priority === 'crítica' ? `
        <div style="border: 1px solid #FF6321; background: #FFF5F0; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0; color: #FF6321; font-weight: bold;">⚠️ ATENCIÓN PRIORITARIA</p>
          <p style="margin: 5px 0 0 0; font-size: 0.9em;">Has marcado esta solicitud como crítica. Nuestro equipo de respuesta inmediata está siendo notificado prioritariamente.</p>
        </div>
        ` : ''}

        <p>Si tienes alguna duda inmediata, también puedes escribirnos directamente por WhatsApp al número principal.</p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #525660; font-size: 0.8em;">
          <p>© ${new Date().getFullYear()} Electric Home El Salvador. Todos los derechos reservados.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(adminMailOptions);
  await transporter.sendMail(clientMailOptions);
};
