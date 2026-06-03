---
title: Ota yhteyttä
description: Lähetä viesti Isoria — demokratian rakentajat ry:lle.
---

# Ota yhteyttä

Lähetä viesti niin vastaamme mahdollisimman pian.

<form method="POST" action="/api/contact" class="contact-form">
  <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px">

  <label>
    Nimi
    <input type="text" name="name" required maxlength="200">
  </label>

  <label>
    Sähköposti
    <input type="email" name="email" required maxlength="200">
  </label>

  <label>
    Viesti
    <textarea name="message" rows="8" required maxlength="5000"></textarea>
  </label>

  <button type="submit">Lähetä</button>
</form>

<style>
.contact-form { display: flex; flex-direction: column; gap: 1rem; max-width: 40rem; }
.contact-form label { display: flex; flex-direction: column; gap: 0.25rem; font-weight: 600; }
.contact-form input, .contact-form textarea {
  font: inherit; padding: 0.5rem 0.75rem; border: 1px solid var(--gray); border-radius: 4px;
  background: var(--light); color: var(--dark);
}
.contact-form textarea { resize: vertical; min-height: 8rem; }
.contact-form button {
  align-self: flex-start; padding: 0.6rem 1.5rem; font: inherit; font-weight: 600;
  background: var(--secondary); color: var(--light); border: none; border-radius: 4px; cursor: pointer;
}
.contact-form button:hover { opacity: 0.9; }
</style>
