/* ============================================================
   zoho-lead.ts — the only place that talks to the CRM.

   The payload is carried over verbatim from the live WordPress page's
   Zoho WebToLeadForm, field names and hashes included. `LEADCF21` is
   the custom field the "what are you trying to solve?" answer lands in;
   do not rename it here without renaming it in Zoho first.

   ---------------------------------------------------------------
   WHY no-cors, AND WHAT THAT COSTS.

   crm.zoho.com/crm/WebToLeadForm does not return CORS headers. A normal
   fetch would have the response blocked and the promise rejected even
   though the lead was created — the worst possible outcome, because the
   visitor is told it failed after it worked. `mode: "no-cors"` delivers
   the POST and hands back an opaque response instead. The lead is
   created; we simply cannot read the confirmation.

   So this function resolves true whenever the request left the browser.
   That is the same guarantee the old page had (it POSTed a real form
   and let Zoho redirect), not a regression. Genuine failures — offline,
   DNS, blocked by an extension — still reject and surface as false, and
   the form shows the sales@ fallback.

   ---------------------------------------------------------------
   DEV SAFETY. Outside a production build the POST is skipped and the
   payload is logged instead, so that filling the form while working on
   the page cannot put junk leads in the CRM. Nothing needs configuring
   for production: `NODE_ENV` is "production" in `next build` output.
   ============================================================ */

const ENDPOINT = "https://crm.zoho.com/crm/WebToLeadForm";

export type DemoLead = {
  firstname: string;
  lastname: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
};

export async function submitDemoLead(lead: DemoLead): Promise<boolean> {
  const body = new FormData();
  body.append("First Name", lead.firstname.trim());
  body.append("Last Name", lead.lastname.trim());
  body.append("Email", lead.email.trim());
  body.append("Mobile", lead.phone.trim());
  body.append("Company", lead.company.trim());
  body.append("LEADCF21", lead.notes.trim());
  body.append("actionType", "TGVhZHM=");
  body.append("returnURL", "https://instasafe.com/thank-you-demo/");
  body.append(
    "xnQsjsdp",
    "3fa7b0dc086e3ff23622b0a2272e55d83b2e8787ffa8c69c437001e8ba8bd648"
  );
  body.append("zc_gad", "");
  body.append(
    "xmIwtLD",
    "93c53bf2d6b9e06f0350ec667672f4a08c35e20848edd36b602377da378f5ee1"
  );

  if (process.env.NODE_ENV !== "production") {
    console.info("[book-a-demo] dev build — lead not sent:", lead);
    await new Promise((r) => setTimeout(r, 600));
    return true;
  }

  try {
    await fetch(ENDPOINT, { method: "POST", mode: "no-cors", body });
    return true;
  } catch (err) {
    console.error("[book-a-demo] lead submit failed:", err);
    return false;
  }
}
