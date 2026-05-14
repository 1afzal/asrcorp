import nodemailer, { Transporter } from 'nodemailer';

let transporter: Transporter | null = null;
let warned = false;

function getTransporter(): Transporter | null {
  if (transporter) return transporter;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !port || !user || !pass) {
    if (!warned) {
      console.log(
        '[Softwaresellr] SMTP not configured — order notifications will be logged only. Set SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASSWORD in server/.env to enable.',
      );
      warned = true;
    }
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  return transporter;
}

export interface OrderEmailInput {
  productName?: string;
  amountINR?: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  productSlug?: string;
  source?: string;
}

/**
 * Sends a "new order" email to the admin notifying them that a customer just
 * clicked "Order on WhatsApp" on the public store. Fire-and-forget — never
 * throws to the caller, since a failed email shouldn't break the order flow.
 */
export async function sendNewOrderEmail(input: OrderEmailInput): Promise<void> {
  const tx = getTransporter();
  const to = process.env.NOTIFY_EMAIL || process.env.ADMIN_EMAIL;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  const subject = `New order intent: ${input.productName || 'unspecified product'}`;
  const lines = [
    'A customer just clicked Order on WhatsApp on the public store.',
    '',
    `Product:  ${input.productName || '—'}`,
    `Price:    ${input.amountINR ? `₹${input.amountINR.toLocaleString('en-IN')}` : '—'}`,
    `Customer: ${input.customerName || '—'}`,
    `Email:    ${input.customerEmail || '—'}`,
    `Phone:    ${input.customerPhone || '—'}`,
    `Slug:     ${input.productSlug || '—'}`,
    `Source:   ${input.source || 'whatsapp'}`,
    '',
    'They are now in WhatsApp with their details pre-filled. Reply on WhatsApp to confirm and arrange payment.',
  ];

  if (!tx || !to || !from) {
    console.log(`[Softwaresellr] (email skipped) ${subject}\n${lines.join('\n')}`);
    return;
  }

  try {
    await tx.sendMail({
      from,
      to,
      subject,
      text: lines.join('\n'),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Softwaresellr] failed to send order email:', message);
  }
}
