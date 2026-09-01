import type { APIRoute } from 'astro';

export const prerender = false;

const archiveUrl = 'https://drive.google.com/drive/folders/16OHTqjf6pePj--PbYZK5FLvjDNl2dsUL?usp=sharing';

async function digest(value: string): Promise<Uint8Array> {
  const bytes = new TextEncoder().encode(value);
  return new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
}

function equalBytes(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left[index] ^ right[index];
  }
  return difference === 0;
}

export const POST: APIRoute = async ({ request }) => {
  const configuredPassword = import.meta.env.ARCHIVE_PASSWORD ?? process.env.ARCHIVE_PASSWORD;

  if (!configuredPassword) {
    return Response.json(
      { message: 'The archive password has not been configured yet.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  let submittedPassword = '';
  try {
    const body = await request.json() as { password?: unknown };
    if (typeof body.password === 'string') submittedPassword = body.password;
  } catch {
    return Response.json(
      { message: 'Please enter the family password.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const [submittedHash, configuredHash] = await Promise.all([
    digest(submittedPassword),
    digest(configuredPassword),
  ]);

  if (!equalBytes(submittedHash, configuredHash)) {
    return Response.json(
      { message: 'That password is not correct. Please try again.' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  return Response.json(
    { url: archiveUrl },
    { headers: { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' } },
  );
};
