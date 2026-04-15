import { NextResponse } from 'next/server';
import { sendContactEmails } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, location, serviceType, priority, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nombre, email y mensaje son obligatorios.' },
        { status: 400 }
      );
    }

    // Ensure admin email is configured
    if (!process.env.EMAIL_ADMIN) {
      console.error('EMAIL_ADMIN env variable is not set.');
      return NextResponse.json(
        { error: 'Error de configuración del servidor. Contacte al administrador.' },
        { status: 500 }
      );
    }

    // Send emails
    await sendContactEmails({
      name,
      email,
      company,
      location,
      serviceType,
      priority,
      message,
    });

    return NextResponse.json({ success: true, message: 'Correos enviados correctamente.' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud. Por favor intente más tarde.' },
      { status: 500 }
    );
  }
}
