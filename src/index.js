const CONTACT_RECIPIENT = "pitkanentuukka@gmail.com";
const FROM_ADDRESS = "Isoria-sivusto <onboarding@resend.dev>";
const MAX_MESSAGE_LENGTH = 5000;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact" && request.method === "POST") {
      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleContact(request, env) {
  let data;
  const ct = request.headers.get("content-type") || "";
  try {
    if (ct.includes("application/x-www-form-urlencoded") || ct.includes("multipart/form-data")) {
      const fd = await request.formData();
      data = Object.fromEntries(fd);
    } else if (ct.includes("application/json")) {
      data = await request.json();
    } else {
      return textResponse("Tuntematon sisältötyyppi.", 400);
    }
  } catch {
    return textResponse("Lomaketta ei voitu jäsentää.", 400);
  }

  if (data.website) {
    return redirectTo(request, "/yhteydenotto-kiitos");
  }

  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();
  const message = String(data.message || "").trim();

  if (!name || !email || !message) {
    return textResponse("Täytäthän kaikki kentät.", 400);
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return textResponse("Viesti on liian pitkä.", 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return textResponse("Sähköpostiosoite ei näytä kelvolliselta.", 400);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [CONTACT_RECIPIENT],
      reply_to: email,
      subject: `Yhteydenotto isoria.fi: ${name}`,
      text: `Nimi: ${name}\nSähköposti: ${email}\n\nViesti:\n${message}\n`,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", res.status, err);
    return textResponse("Viestin lähetys epäonnistui. Yritä uudestaan tai lähetä sähköpostia suoraan.", 502);
  }

  return redirectTo(request, "/yhteydenotto-kiitos");
}

function redirectTo(request, path) {
  return Response.redirect(new URL(path, request.url).toString(), 303);
}

function textResponse(body, status) {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
