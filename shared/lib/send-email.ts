import React from 'react';
import { Resend } from 'resend';

export const sendEmail = async (
	email: string,
	subject: string,
	html: React.ReactNode
) => {
	const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY);

	const { data, error } = await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: subject,
		react: html,
	});

	if (error) {
		throw error;
	}

	return data;
};
