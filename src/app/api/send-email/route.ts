import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/EmailTemplate';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.error('RESEND_API_KEY is not defined in environment variables');
      return NextResponse.json(
        { error: 'Email service is not configured. Please add RESEND_API_KEY to environment variables.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await req.json();
    const { type, data } = body;

    const title = type === 'contact' ? 'New Contact Message' : 'New Quote Request';
    const recipient = 'sales@stem-magnetics.co.zw';

    const { data: resendData, error } = await resend.emails.send({
      from: 'Stem Magnetics <onboarding@resend.dev>',
      to: [recipient],
      subject: `${title}: ${data.subject || data.name}`,
      react: EmailTemplate({ title, data, type }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(resendData);
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
