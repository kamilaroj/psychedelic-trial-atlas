// Run the two existing cells first, unchanged:
// - visual1EcosystemOverviev
// - visual1CompanyLandscapePremium1
//
// Then add this third cell. Embed ONLY this cell on the website.
// The existing overview remains the data source. Its values are shown as cards.
// The Company Landscape node itself is not changed.

visual1EcosystemAndCompanyLandscape = {
  const combined = html`<div class="visual1-combined-atlas"></div>`;
  const overviewSource = visual1EcosystemOverviev;
  const metricGroups = Array.from(overviewSource.querySelectorAll("g.metric"));

  // Read the existing rendered labels rather than relying on their visual order.
  const metricValue = label => {
    const target = label.toUpperCase();
    const metric = metricGroups.find(group => {
      const lines = Array.from(group.querySelectorAll(".label-text tspan"))
        .map(line => line.textContent.trim())
        .filter(Boolean)
        .join(" ")
        .toUpperCase();

      return lines === target;
    });

    return metric?.querySelector(".value-text")?.textContent?.trim() || "—";
  };

  const cards = [
    { label: "Companies tracked", value: metricValue("COMPANIES & DEVELOPERS"), note: "Included companies and developers" },
    { label: "Registered activity", value: metricValue("TRIAL RECORDS"), note: "Registry-linked trial records" },
    { label: "Pipeline context", value: metricValue("PIPELINE ITEMS"), note: "Non-registry programme context" },
    { label: "Indication areas", value: metricValue("THERAPEUTIC AREAS"), note: "Represented indication groups" },
    { label: "Countries", value: metricValue("COUNTRIES"), note: "Countries in included records" }
  ];

  const overview = html`<section class="visual1-overview-cards" aria-label="Ecosystem overview">
    <div class="visual1-overview-heading">
      <p>ECOSYSTEM OVERVIEW</p>
      <h2>The Psychedelic Ecosystem</h2>
      <span>Visible company, clinical-trial and pipeline context in the public data.</span>
    </div>
    <div class="visual1-overview-card-grid">
      ${cards.map(card => html`<article class="visual1-overview-card">
        <p>${card.label}</p>
        <strong>${card.value}</strong>
        <span>${card.note}</span>
      </article>`)}
    </div>
  </section>`;

  const style = html`<style>
    .visual1-combined-atlas {
      width: 100%;
      max-width: 980px;
      margin: 0 auto;
      background: transparent;
    }

    .visual1-overview-cards {
      padding: 28px 0 0;
      color: #000000;
      font-family: "Inter", -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
    }

    .visual1-overview-heading {
      margin: 0 0 18px;
    }

    .visual1-overview-heading p,
    .visual1-overview-card p {
      margin: 0;
      color: #5f6872;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.07em;
      line-height: 1.2;
      text-transform: uppercase;
    }

    .visual1-overview-heading h2 {
      margin: 5px 0 4px;
      font-family: "Inter Tight", "Inter", -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
      font-size: clamp(29px, 3.1vw, 40px);
      font-weight: 900;
      letter-spacing: -0.065em;
      line-height: 0.98;
    }

    .visual1-overview-heading span {
      color: #5f6872;
      font-size: 13px;
      font-weight: 550;
    }

    .visual1-overview-card-grid {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 12px;
    }

    .visual1-overview-card {
      display: block;
      min-height: 102px;
      padding: 16px 17px;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.82);
      border: 1px solid rgba(29, 29, 31, 0.08);
      border-radius: 17px;
      box-shadow: 0 9px 26px rgba(29, 29, 31, 0.065);
    }

    .visual1-overview-card strong,
    .visual1-overview-card span {
      display: block;
    }

    .visual1-overview-card strong {
      margin: 6px 0 4px;
      color: #1d1d1f;
      font-size: 29px;
      font-weight: 850;
      letter-spacing: -0.065em;
      line-height: 0.9;
    }

    .visual1-overview-card span {
      color: #5f6872;
      font-size: 10px;
      font-weight: 600;
      line-height: 1.25;
    }

    .visual1-company-landscape-source {
      width: 100%;
      max-width: 980px;
      margin-left: auto;
      margin-right: auto;
    }

    .visual1-overview-cards + * {
      margin-top: -34px;
    }

    @media (max-width: 760px) {
      .visual1-overview-cards {
        padding: 22px 0 24px;
      }

      .visual1-overview-card-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .visual1-overview-card:last-child {
        grid-column: 1 / -1;
      }
    }
  </style>`;

  combined.append(style);

  // The former overview circles are not displayed. Their existing calculated
  // data supplies the five cards above. The Company Landscape remains unchanged.
  overviewSource.style.display = "none";
  const companySource = visual1CompanyLandscapePremium1;
  companySource.classList.add("visual1-company-landscape-source");
  combined.append(
    overview,
    companySource
  );

  return combined;
}
