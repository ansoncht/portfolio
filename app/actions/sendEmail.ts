'use server';

import { Resend } from 'resend';
import { validateString, getErrorMessage } from '@/app/lib/utils';
import React from 'react';
import ContactFormEmail from '@/app/email/ContactFormEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get('senderEmail');
  const message = formData.get('message');

  // simple server-side validation
  if (!validateString(senderEmail, 500)) {
    return {
      error: 'Invalid sender email',
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: 'Invalid message',
    };
  }

  let data;
  try {
    data = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'ansoncht@gmail.com',
      subject: 'Message from Portfolio Contact Form',
      reply_to: senderEmail,
      react: React.createElement(ContactFormEmail, {
        message: message,
        senderEmail: senderEmail,
      }),
    });
  } catch (error: unknown) {
    console.log(error);
    return {
      error: getErrorMessage(error),
    };
  }

  return {
    data,
  };
};
