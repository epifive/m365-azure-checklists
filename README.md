# Microsoft 365 security and Azure cost checklists

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

Two practical checklists for IT admins, with 54 checks in total: a security baseline for a Microsoft 365 tenant and a cost review for an Azure subscription. Every check says why it matters and links to the Microsoft Learn page that shows how to do it, so you can work through them without hunting for documentation.

Maintained by [EpiFive](https://www.epifive.com). Printable PDF versions: https://www.epifive.com/guides

## Contents

- [The checklists](#the-checklists)
- [How to use them](#how-to-use-them)
- [Contributing](#contributing)
- [Regenerating](#regenerating)
- [License](#license)

## The checklists

| Checklist | Checks | Covers | PDF |
|---|---:|---|---|
| [Microsoft 365 Security Checklist](microsoft-365-security-checklist.md) | 27 | Identity and MFA, Conditional Access, Admin roles, Email security, Devices, Audit and logging, Backups and retention | [PDF](https://www.epifive.com/downloads/microsoft-365-security-checklist.pdf) |
| [Azure Cost Saving Checklist](azure-cost-saving-checklist.md) | 27 | Know where the money goes, Reservations and savings plans, Rightsizing, Orphaned resources, Dev and test, Storage tiers, Egress, Log Analytics, Tagging and budgets | [PDF](https://www.epifive.com/downloads/azure-cost-saving-checklist.pdf) |

- **Microsoft 365 Security Checklist:** Identity and MFA, Conditional Access, admin roles, email security (SPF, DKIM, DMARC, forwarding), devices, audit logging and backups, each check with a Microsoft Learn link.
- **Azure Cost Saving Checklist:** Reservations and savings plans, rightsizing, orphaned disks, IPs and snapshots, dev/test schedules, storage tiers, egress, Log Analytics retention, tagging and budgets, each with a Microsoft Learn link.

## How to use them

1. **Track progress in GitHub.** Copy a section into a new issue in your own repository; the `- [ ]` items become clickable checkboxes and GitHub shows a progress count.
2. **Start where the risk or the money is.** For Microsoft 365, identity and MFA come first. For Azure, open Cost analysis and start with the checklist sections that match your largest cost lines.
3. **Check the licence notes.** Some Microsoft 365 checks need Entra ID P1 or P2, Intune or Defender for Office 365; the linked Learn pages say which.
4. **Test before you enforce.** Run Conditional Access policies in report-only mode first and keep two emergency access accounts excluded.
5. **Repeat quarterly.** Tenants and subscriptions drift; a short review every quarter keeps both lists green.

## Contributing

Microsoft renames features and moves settings often. If a check is outdated, a link is broken or an important control is missing, open an issue with the **Correction** template and include the official Microsoft Learn (or other Microsoft documentation) link that supports the change. Suggestions without an official source cannot be accepted.

## Regenerating

The Markdown is generated from `data/checklists.json` with Node.js 18 or later:

```sh
node generate.mjs
```

Edit the JSON, not the generated Markdown.

## License

The checklists are licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). You may copy, adapt and share them, including in client reports and internal runbooks, with attribution. Suggested attribution: "Checklists by EpiFive, https://www.epifive.com/guides, CC BY 4.0". Microsoft, Microsoft 365, Azure and Entra are trademarks of Microsoft Corporation; this project is not affiliated with or endorsed by Microsoft.

---

Free tools from EpiFive: [Cloud cost optimizer](https://www.epifive.com/tools/cloud-cost-optimizer) · [Email domain checker](https://www.epifive.com/tools/email-domain-checker) (SPF, DKIM, DMARC) · Want a hand working through a checklist? See [EpiFive services](https://www.epifive.com/services).
