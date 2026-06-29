// STUB — replace with your ESP endpoint (Mailchimp, ConvertKit, etc.)
// TODO: POST email to /api/newsletter when wired up

export async function subscribeEmail(email: string): Promise<{ ok: boolean }> {
  console.log("[newsletter stub] subscribe:", email);
  return { ok: true };
}
