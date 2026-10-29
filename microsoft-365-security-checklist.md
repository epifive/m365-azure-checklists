# Microsoft 365 Security Checklist

A tenant-wide security baseline for Microsoft 365 and Microsoft Entra ID, taken from Microsoft’s own guidance. Work through it top to bottom; some checks need Entra ID P1 or P2, Intune or Defender for Office 365 licences, as noted in the linked pages.

**27 checks** in 7 sections, each with the reason it matters and the Microsoft Learn page that explains how. Edition: October 2026.

Printable version: [epifive.com/guides/microsoft-365-security-checklist](https://www.epifive.com/guides/microsoft-365-security-checklist) · [PDF download](https://www.epifive.com/downloads/microsoft-365-security-checklist.pdf)

> [!TIP]
> Markdown checkboxes in a file are read-only on GitHub. Paste a section into a GitHub issue, a pull request description or a project note to get clickable checkboxes and track progress.

## Contents

- [Identity and MFA](#identity-and-mfa) (5)
- [Conditional Access](#conditional-access) (5)
- [Admin roles](#admin-roles) (3)
- [Email security](#email-security) (5)
- [Devices](#devices) (3)
- [Audit and logging](#audit-and-logging) (4)
- [Backups and retention](#backups-and-retention) (2)

## Identity and MFA

- [ ] **Require multifactor authentication for every user, with security defaults or a Conditional Access policy.**\
  Why: MFA blocks the large majority of password-spray and credential-stuffing attacks against cloud accounts. [Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-mfa-strength)
- [ ] **Require phishing-resistant MFA (passkeys/FIDO2, Windows Hello for Business or certificates) for administrators.**\
  Why: Admin accounts are the main target of adversary-in-the-middle phishing, which can relay app and SMS codes. [Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-admin-phish-resistant-mfa)
- [ ] **Enable self-service password reset for all users.**\
  Why: Users can recover from a forgotten or compromised password with verified methods instead of a helpdesk call. [Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr)
- [ ] **Use Microsoft Entra Password Protection, with a custom banned-password list for your company and product names.**\
  Why: It rejects weak and commonly guessed passwords when users set or change them. [Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad)
- [ ] **Create two cloud-only emergency access (break-glass) accounts, protected with phishing-resistant MFA and monitored for sign-ins.**\
  Why: They keep you from being locked out of the tenant if Conditional Access or a federation provider fails. [Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access)

## Conditional Access

- [ ] **Block legacy authentication protocols for all users.**\
  Why: Legacy protocols such as POP, IMAP and SMTP basic auth cannot do MFA, so attackers use them to bypass it. [Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-block-legacy-authentication)
- [ ] **Turn on sign-in risk and user risk policies (Entra ID P2).**\
  Why: Microsoft Entra ID Protection can then demand MFA or a secure password change when a sign-in or account looks compromised. [Microsoft Learn](https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies)
- [ ] **Require a compliant or hybrid-joined device for access to company data.**\
  Why: Stolen credentials alone are no longer enough; the sign-in must come from a managed, healthy device. [Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-device-compliance)
- [ ] **Test every new policy in report-only mode before you enforce it, and exclude your emergency access accounts.**\
  Why: Report-only mode shows who a policy would affect, so you do not lock out users or yourself. [Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only)
- [ ] **Restrict user consent to applications (verified publishers and low-risk permissions only) and set up the admin consent workflow.**\
  Why: Consent phishing tricks users into granting a malicious app ongoing access to mail and files. [Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent)

## Admin roles

- [ ] **Keep the number of Global Administrators small (Microsoft recommends fewer than five) and use dedicated, cloud-only admin accounts.**\
  Why: Every Global Administrator can change anything in the tenant, so each extra one widens the attack surface. [Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/best-practices)
- [ ] **Assign the least-privileged role for each task, such as Exchange, User or Helpdesk Administrator, instead of Global Administrator.**\
  Why: A compromised account with a narrow role can do far less damage. [Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/delegate-by-task)
- [ ] **Use Privileged Identity Management for just-in-time, time-limited and approved role activation (Entra ID P2).**\
  Why: Standing admin access is replaced by roles that are active only when needed and are fully audited. [Microsoft Learn](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure)

## Email security

- [ ] **Publish an SPF record that lists every service allowed to send mail for your domains.**\
  Why: Receiving servers use SPF to check that mail claiming to be from your domain came from an authorised source. [Microsoft Learn](https://learn.microsoft.com/en-us/defender-office-365/email-authentication-spf-configure)
- [ ] **Turn on DKIM signing for each custom domain in Microsoft 365.**\
  Why: DKIM signs outgoing mail so receivers can verify it was not altered and really came from your domain. [Microsoft Learn](https://learn.microsoft.com/en-us/defender-office-365/email-authentication-dkim-configure)
- [ ] **Publish a DMARC record, start with p=none and reporting, then move to quarantine or reject.**\
  Why: DMARC tells receivers what to do with mail that fails SPF and DKIM, which stops direct spoofing of your domain. [Microsoft Learn](https://learn.microsoft.com/en-us/defender-office-365/email-authentication-dmarc-configure)
- [ ] **Block automatic forwarding to external addresses in the outbound spam policy, with exceptions only where needed.**\
  Why: Attackers who take over a mailbox often add a forwarding rule to copy mail out quietly. [Microsoft Learn](https://learn.microsoft.com/en-us/defender-office-365/outbound-spam-policies-external-email-forwarding)
- [ ] **Apply the Standard or Strict preset security policies for anti-spam, anti-phishing, Safe Links and Safe Attachments.**\
  Why: Presets keep protection at Microsoft’s recommended settings as new controls are added. [Microsoft Learn](https://learn.microsoft.com/en-us/defender-office-365/preset-security-policies)

## Devices

- [ ] **Enrol devices in Intune and set compliance policies (OS version, encryption, firewall, antivirus).**\
  Why: Compliance status is what Conditional Access uses to decide whether a device is trusted. [Microsoft Learn](https://learn.microsoft.com/en-us/intune/device-security/compliance/overview)
- [ ] **Use app protection policies for Outlook, Teams and OneDrive on personal phones.**\
  Why: They protect company data inside the apps (no copy to personal apps, PIN, selective wipe) without enrolling the phone. [Microsoft Learn](https://learn.microsoft.com/en-us/intune/app-management/protection/overview)
- [ ] **Encrypt Windows devices with BitLocker and escrow the recovery keys in Entra ID.**\
  Why: A lost or stolen laptop then does not expose the files stored on it. [Microsoft Learn](https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/encrypt-bitlocker-windows)

## Audit and logging

- [ ] **Confirm that Microsoft Purview audit (the unified audit log) is turned on.**\
  Why: Without the audit log you cannot investigate who read, changed or deleted mail and files. [Microsoft Learn](https://learn.microsoft.com/en-us/purview/audit-log-enable-disable)
- [ ] **Send Entra sign-in and audit logs to a Log Analytics workspace or your SIEM.**\
  Why: Entra keeps these logs for a limited time only; exporting them keeps the history you need for an investigation. [Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-integrate-activity-logs-with-azure-monitor-logs)
- [ ] **Review the default alert policies and send alerts to a monitored mailbox.**\
  Why: Built-in alerts flag events such as new forwarding rules, elevated mail sending and admin changes. [Microsoft Learn](https://learn.microsoft.com/en-us/defender-xdr/alert-policies)
- [ ] **Check Microsoft Secure Score every month and work through its top recommended actions.**\
  Why: Secure Score measures your configuration against Microsoft’s recommendations and shows what to fix next. [Microsoft Learn](https://learn.microsoft.com/en-us/defender-xdr/microsoft-secure-score)

## Backups and retention

- [ ] **Set retention policies for Exchange, SharePoint, OneDrive and Teams that match your legal and business needs.**\
  Why: Retention keeps content for a set period even if a user deletes it. [Microsoft Learn](https://learn.microsoft.com/en-us/purview/retention)
- [ ] **Decide whether you need a backup in addition to retention, such as Microsoft 365 Backup or a third-party service, and test a restore.**\
  Why: Retention is not a point-in-time backup; a backup lets you roll back after ransomware or a bad bulk change. [Microsoft Learn](https://learn.microsoft.com/en-us/microsoft-365/backup/backup-overview)

---

Edition October 2026. Licences, portal names and defaults change; the linked Microsoft Learn pages are the authoritative source. Found an outdated check? Open an issue with the "Correction" template and include the official Microsoft Learn link.

From the [EpiFive free IT checklists](https://www.epifive.com/guides). Licensed under CC BY 4.0.
