// Regenerates the checklist Markdown in this repository.
//
//   node generate.mjs                       render from data/checklists.json
//   node generate.mjs <path-to-epifive-src>  first re-extract data/checklists.json from the site source
//                                           (src/lib/guides.ts and src/lib/magnets.ts), then render
//
// Extraction needs Node.js 22.18 or later (built-in TypeScript type stripping). Rendering works on Node 18+.
// Writes README.md, microsoft-365-security-checklist.md, azure-cost-saving-checklist.md, REPO_META.md and
// .github/ISSUE_TEMPLATE/correction.md. LICENSE is not touched.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SITE = 'https://www.epifive.com';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(HERE, 'data', 'checklists.json');

// ---------- Optional: extract from the site source ----------

if (process.argv[2]) {
  const lib = path.join(path.resolve(process.argv[2]), 'lib');
  const guidesTs = path.join(lib, 'guides.ts');
  const magnetsTs = path.join(lib, 'magnets.ts');
  if (!fs.existsSync(guidesTs) || !fs.existsSync(magnetsTs)) {
    console.error(`Expected ${guidesTs} and ${magnetsTs}`);
    process.exit(1);
  }
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'checklists-'));
  try {
    fs.writeFileSync(path.join(tmp, 'package.json'), '{"type":"module"}\n');
    fs.copyFileSync(magnetsTs, path.join(tmp, 'magnets.ts'));
    fs.writeFileSync(
      path.join(tmp, 'guides.ts'),
      fs.readFileSync(guidesTs, 'utf8').replace(/from '\.\/magnets'/, "from './magnets.ts'"),
    );
    const { GUIDES } = await import(pathToFileURL(path.join(tmp, 'guides.ts')).href);
    fs.mkdirSync(path.dirname(DATA), { recursive: true });
    fs.writeFileSync(DATA, JSON.stringify(GUIDES, null, 2) + '\n');
    console.log(`Extracted ${GUIDES.length} checklists to ${DATA}`);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

// ---------- Render ----------

const guides = JSON.parse(fs.readFileSync(DATA, 'utf8'));

const text = (s) =>
  String(s)
    .replace(/\\/g, '\\\\')
    .replace(/([*_~[\]|])/g, '\\$1')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
const anchor = (h) =>
  h
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .replace(/\s/g, '-');
const itemCount = (g) => g.sections.reduce((n, s) => n + s.items.length, 0);
const pageUrl = (g) => `${SITE}/guides/${g.slug}`;
const pdfUrl = (g) => `${SITE}/downloads/${g.slug}.pdf`;

for (const g of guides) {
  const L = [];
  L.push(`# ${text(g.title)}`, '');
  L.push(text(g.intro), '');
  L.push(`**${itemCount(g)} checks** in ${g.sections.length} sections, each with the reason it matters and the Microsoft Learn page that explains how. Edition: ${g.edition}.`, '');
  L.push(`Printable version: [epifive.com/guides/${g.slug}](${pageUrl(g)}) · [PDF download](${pdfUrl(g)})`, '');
  L.push('> [!TIP]');
  L.push('> Markdown checkboxes in a file are read-only on GitHub. Paste a section into a GitHub issue, a pull request description or a project note to get clickable checkboxes and track progress.', '');
  L.push('## Contents', '');
  for (const s of g.sections) L.push(`- [${text(s.title)}](#${anchor(s.title)}) (${s.items.length})`);
  L.push('');
  for (const s of g.sections) {
    L.push(`## ${text(s.title)}`, '');
    for (const it of s.items) {
      L.push(`- [ ] **${text(it.check)}**\\`);
      L.push(`  Why: ${text(it.why)} [Microsoft Learn](${it.href})`);
    }
    L.push('');
  }
  L.push('---', '');
  L.push(
    `Edition ${g.edition}. Licences, portal names and defaults change; the linked Microsoft Learn pages are the authoritative source. Found an outdated check? Open an issue with the "Correction" template and include the official Microsoft Learn link.`,
    '',
  );
  L.push(`From the [EpiFive free IT checklists](${SITE}/guides). Licensed under CC BY 4.0.`, '');
  fs.writeFileSync(path.join(HERE, `${g.slug}.md`), L.join('\n'));
}

const m365 = guides.find((g) => g.slug === 'microsoft-365-security-checklist');
const azure = guides.find((g) => g.slug === 'azure-cost-saving-checklist');
const total = guides.reduce((n, g) => n + itemCount(g), 0);

const R = [];
R.push('# Microsoft 365 security and Azure cost checklists', '');
R.push(
  `[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)`,
  '',
);
R.push(
  `Two practical checklists for IT admins, with ${total} checks in total: a security baseline for a Microsoft 365 tenant and a cost review for an Azure subscription. Every check says why it matters and links to the Microsoft Learn page that shows how to do it, so you can work through them without hunting for documentation.`,
  '',
);
R.push(`Maintained by [EpiFive](${SITE}). Printable PDF versions: ${SITE}/guides`, '');
R.push('## Contents', '');
R.push('- [The checklists](#the-checklists)');
R.push('- [How to use them](#how-to-use-them)');
R.push('- [Contributing](#contributing)');
R.push('- [Regenerating](#regenerating)');
R.push('- [License](#license)', '');

R.push('## The checklists', '');
R.push('| Checklist | Checks | Covers | PDF |', '|---|---:|---|---|');
for (const g of [m365, azure]) {
  R.push(`| [${text(g.title)}](${g.slug}.md) | ${itemCount(g)} | ${g.sections.map((s) => text(s.title)).join(', ')} | [PDF](${pdfUrl(g)}) |`);
}
R.push('');
R.push(`- **${text(m365.title)}:** ${text(m365.blurb)}`);
R.push(`- **${text(azure.title)}:** ${text(azure.blurb)}`, '');

R.push('## How to use them', '');
R.push('1. **Track progress in GitHub.** Copy a section into a new issue in your own repository; the `- [ ]` items become clickable checkboxes and GitHub shows a progress count.');
R.push('2. **Start where the risk or the money is.** For Microsoft 365, identity and MFA come first. For Azure, open Cost analysis and start with the checklist sections that match your largest cost lines.');
R.push('3. **Check the licence notes.** Some Microsoft 365 checks need Entra ID P1 or P2, Intune or Defender for Office 365; the linked Learn pages say which.');
R.push('4. **Test before you enforce.** Run Conditional Access policies in report-only mode first and keep two emergency access accounts excluded.');
R.push('5. **Repeat quarterly.** Tenants and subscriptions drift; a short review every quarter keeps both lists green.', '');

R.push('## Contributing', '');
R.push('Microsoft renames features and moves settings often. If a check is outdated, a link is broken or an important control is missing, open an issue with the **Correction** template and include the official Microsoft Learn (or other Microsoft documentation) link that supports the change. Suggestions without an official source cannot be accepted.', '');

R.push('## Regenerating', '');
R.push('The Markdown is generated from `data/checklists.json` with Node.js 18 or later:', '');
R.push('```sh', 'node generate.mjs', '```', '');
R.push('Edit the JSON, not the generated Markdown.', '');

R.push('## License', '');
R.push(
  `The checklists are licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). You may copy, adapt and share them, including in client reports and internal runbooks, with attribution. Suggested attribution: "Checklists by EpiFive, ${SITE}/guides, CC BY 4.0". Microsoft, Microsoft 365, Azure and Entra are trademarks of Microsoft Corporation; this project is not affiliated with or endorsed by Microsoft.`,
  '',
);
R.push('---', '');
R.push(
  `Free tools from EpiFive: [Cloud cost optimizer](${SITE}/tools/cloud-cost-optimizer) · [Email domain checker](${SITE}/tools/email-domain-checker) (SPF, DKIM, DMARC) · Want a hand working through a checklist? See [EpiFive services](${SITE}/services).`,
  '',
);
fs.writeFileSync(path.join(HERE, 'README.md'), R.join('\n'));

fs.mkdirSync(path.join(HERE, '.github', 'ISSUE_TEMPLATE'), { recursive: true });
fs.writeFileSync(
  path.join(HERE, '.github', 'ISSUE_TEMPLATE', 'correction.md'),
  `---
name: Correction
about: Report an outdated check, a broken link or a missing control, with the official Microsoft link
title: "[Correction] <checklist>: <check>"
labels: correction
---

**Checklist**
<!-- microsoft-365-security-checklist or azure-cost-saving-checklist -->

**Check**
<!-- Paste the check as it appears, or "new check" -->

**What is wrong**
<!-- Renamed feature, changed default, broken link, licence requirement, missing control, ... -->

**Suggested wording**
<!-- The corrected check and why line -->

**Official documentation link (required)**
<!-- A Microsoft Learn (or other official Microsoft) page that supports the change.
     Suggestions without an official source cannot be accepted. -->
`,
);

fs.writeFileSync(
  path.join(HERE, 'REPO_META.md'),
  `# Repository metadata

For the GitHub "About" box.

**Name:** m365-azure-checklists

**Description:** Microsoft 365 security baseline and Azure cost saving checklists as GitHub task lists: ${total} checks, each with the reason and a Microsoft Learn link. CC BY 4.0.

**Website:** ${SITE}/guides

**Topics (14):**

microsoft-365, office-365, azure, entra-id, security-checklist, security-baseline, conditional-access, mfa, cost-optimization, finops, azure-cost-management, checklist, sysadmin, it-admin
`,
);

console.log(`Wrote ${guides.length} checklists (${total} checks) to ${HERE}`);
