import nodemailer from "nodemailer";

// Create transporter once
function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.zoho.com",
    port: Number(process.env.EMAIL_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });
}

export interface MailData {
  name: string;
  email: string;
  company?: string;
  location: string;
  serviceType: string;
  priority: string;
  message: string;
}

// ─── 1. Confirmation email → Client ─────────────────────────────────────────
async function sendClientConfirmation(data: MailData) {
  const { name, email, serviceType, priority } = data;
  const transporter = getTransporter();
  const fromEmail = process.env.EMAIL_USER!;

  const isUrgent = priority === "crítica";

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#050505;padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#FF6321;font-size:28px;font-family:Georgia,serif;letter-spacing:-1px;">Electric Home</h1>
            <p style="margin:6px 0 0;color:#aaaaaa;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Ingeniería Eléctrica de Alta Fidelidad</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 16px;color:#050505;font-size:15px;">Estimado/a <strong>${name}</strong>,</p>
            <p style="margin:0 0 16px;color:#525660;font-size:14px;line-height:1.7;">
              Hemos recibido correctamente su solicitud para el servicio de <strong style="color:#050505;">${serviceType}</strong>. Nuestro equipo de ingeniería lo revisará y se pondrá en contacto dentro de las próximas <strong>24 horas laborables</strong>.
            </p>
            ${isUrgent ? `
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF5F0;border-left:4px solid #FF6321;border-radius:2px;margin:20px 0;">
              <tr><td style="padding:16px;">
                <p style="margin:0 0 4px;color:#FF6321;font-weight:bold;font-size:13px;">Protocolo de Atencion Prioritaria</p>
                <p style="margin:0;color:#525660;font-size:13px;">Esta solicitud fue marcada como critica. Nuestro equipo de respuesta inmediata ha sido notificado.</p>
              </td></tr>
            </table>` : ""}
            <p style="margin:20px 0 0;color:#525660;font-size:14px;line-height:1.7;">Si necesita atención inmediata, puede contactarnos directamente por WhatsApp.</p>
          </td>
        </tr>
        <!-- Divider -->
        <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #f0f0f0;margin:0;"></td></tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#aaaaaa;font-size:11px;">© ${new Date().getFullYear()} Electric Home El Salvador. Todos los derechos reservados.</p>
            <p style="margin:4px 0 0;color:#aaaaaa;font-size:11px;">${fromEmail}</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `Electric Home — Confirmacion de Solicitud\n\nEstimado/a ${name},\n\nHemos recibido su solicitud para el servicio de "${serviceType}".\n\nNuestro equipo se pondra en contacto en las proximas 24 horas laborables.\n\n${isUrgent ? "ATENCION: Esta solicitud fue marcada como critica y ha sido escalada de inmediato.\n\n" : ""}Electric Home El Salvador\n${fromEmail}`;

  await transporter.sendMail({
    from: `"Electric Home" <${fromEmail}>`,
    to: data.email,
    replyTo: fromEmail,
    subject: `Solicitud recibida: ${serviceType} — Electric Home`,
    text,
    html,
    headers: {
      "X-Mailer": "Electric Home Contact System",
      "Precedence": "bulk",
    },
  });

  console.log(`[MAIL] Client confirmation sent to: ${data.email}`);
}

// ─── 2. Lead notification email → Admin ─────────────────────────────────────
async function sendAdminNotification(data: MailData) {
  const { name, email, company, location, serviceType, priority, message } = data;
  const transporter = getTransporter();
  const fromEmail = process.env.EMAIL_USER!;
  const adminEmail = process.env.EMAIL_ADMIN!;

  const priorityColor = priority === "crítica" ? "#dc2626" : priority === "alta" ? "#d97706" : "#16a34a";

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#050505;padding:32px 40px;">
            <h2 style="margin:0;color:#FF6321;font-size:20px;font-family:Georgia,serif;">Nueva Solicitud de Servicio</h2>
            <p style="margin:6px 0 0;color:#aaaaaa;font-size:12px;">Electric Home — Panel Interno</p>
          </td>
        </tr>
        <!-- Alert banner -->
        <tr>
          <td style="background:${priority === "crítica" ? "#fee2e2" : "#f0fdf4"};padding:12px 40px;border-bottom:3px solid ${priorityColor};">
            <p style="margin:0;font-size:12px;font-weight:bold;color:${priorityColor};text-transform:uppercase;letter-spacing:1px;">
              Prioridad: ${priority.toUpperCase()}
            </p>
          </td>
        </tr>
        <!-- Contact data -->
        <tr>
          <td style="padding:32px 40px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="display:block;font-size:10px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#aaa;margin-bottom:4px;">Nombre</span>
                  <span style="font-size:15px;color:#050505;font-weight:600;">${name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="display:block;font-size:10px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#aaa;margin-bottom:4px;">Email del Cliente</span>
                  <a href="mailto:${email}" style="font-size:15px;color:#FF6321;text-decoration:none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="display:block;font-size:10px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#aaa;margin-bottom:4px;">Empresa / Hogar</span>
                  <span style="font-size:15px;color:#050505;">${company || "No especificado"}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="display:block;font-size:10px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#aaa;margin-bottom:4px;">Ubicacion</span>
                  <span style="font-size:15px;color:#050505;">${location}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="display:block;font-size:10px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#aaa;margin-bottom:4px;">Servicio Solicitado</span>
                  <span style="font-size:15px;color:#050505;font-weight:600;">${serviceType}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;">
                  <span style="display:block;font-size:10px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#aaa;margin-bottom:8px;">Mensaje</span>
                  <div style="background:#f9f9f9;padding:16px;border-radius:4px;font-size:14px;color:#525660;line-height:1.7;">${message}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- CTA -->
        <tr>
          <td style="padding:24px 40px;">
            <a href="mailto:${email}?subject=Re: Solicitud de ${serviceType}" style="display:inline-block;background:#FF6321;color:#ffffff;padding:14px 28px;text-decoration:none;font-weight:bold;font-size:13px;border-radius:2px;letter-spacing:1px;">
              RESPONDER AL CLIENTE
            </a>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:16px 40px 24px;border-top:1px solid #f0f0f0;text-align:center;">
            <p style="margin:0;color:#aaaaaa;font-size:11px;">Notificacion interna — Electric Home ${new Date().getFullYear()}</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `NUEVA SOLICITUD — Electric Home\n\nNombre: ${name}\nEmail: ${email}\nEmpresa/Hogar: ${company || "No especificado"}\nUbicacion: ${location}\nServicio: ${serviceType}\nPrioridad: ${priority.toUpperCase()}\n\nMensaje:\n${message}\n\nResponder al cliente: mailto:${email}`;

  await transporter.sendMail({
    from: `"Electric Home Sistema" <${fromEmail}>`,
    to: adminEmail,
    replyTo: `"${name}" <${email}>`,   // Reply goes directly to the client
    subject: `Nuevo lead: ${serviceType} — ${name}`,
    text,
    html,
    headers: {
      "X-Mailer": "Electric Home Contact System",
      "X-Priority": priority === "crítica" ? "1" : "3",
    },
  });

  console.log(`[MAIL] Admin notification sent to: ${adminEmail}`);
}

// ─── Main export ─────────────────────────────────────────────────────────────
export const sendContactEmails = async (data: MailData): Promise<void> => {
  const errors: string[] = [];

  // Send client confirmation first
  try {
    await sendClientConfirmation(data);
  } catch (err: any) {
    console.error("[MAIL] Client email FAILED:", err?.message || err);
    errors.push("client");
  }

  // Send admin notification independently
  try {
    await sendAdminNotification(data);
  } catch (err: any) {
    console.error("[MAIL] Admin email FAILED:", err?.message || err);
    errors.push("admin");
  }

  // Only throw if client email failed (user needs to know)
  if (errors.includes("client")) {
    throw new Error("No se pudo enviar el correo de confirmacion al cliente.");
  }

  if (errors.includes("admin")) {
    // Log but don't fail the request — client already got their confirmation
    console.warn("[MAIL] Admin notification failed silently. Check EMAIL_ADMIN and Zoho settings.");
  }
};
