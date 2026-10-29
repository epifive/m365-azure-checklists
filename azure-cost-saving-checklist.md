# Azure Cost Saving Checklist

Practical cost checks for an Azure subscription, taken from Microsoft’s Cost Management, Advisor and Well-Architected guidance. Start with the items that match your largest cost lines in Cost analysis.

**27 checks** in 9 sections, each with the reason it matters and the Microsoft Learn page that explains how. Edition: October 2026.

Printable version: [epifive.com/guides/azure-cost-saving-checklist](https://www.epifive.com/guides/azure-cost-saving-checklist) · [PDF download](https://www.epifive.com/downloads/azure-cost-saving-checklist.pdf)

> [!TIP]
> Markdown checkboxes in a file are read-only on GitHub. Paste a section into a GitHub issue, a pull request description or a project note to get clickable checkboxes and track progress.

## Contents

- [Know where the money goes](#know-where-the-money-goes) (2)
- [Reservations and savings plans](#reservations-and-savings-plans) (4)
- [Rightsizing](#rightsizing) (4)
- [Orphaned resources](#orphaned-resources) (5)
- [Dev and test](#dev-and-test) (2)
- [Storage tiers](#storage-tiers) (3)
- [Egress](#egress) (1)
- [Log Analytics](#log-analytics) (3)
- [Tagging and budgets](#tagging-and-budgets) (3)

## Know where the money goes

- [ ] **Open Cost analysis and group cost by service, resource group and resource for the last full month.**\
  Why: You need to know your largest cost lines before you decide which savings are worth the effort. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/quick-acm-cost-analysis)
- [ ] **Work through the cost recommendations in Azure Advisor.**\
  Why: Advisor flags underused VMs, idle resources and reservation opportunities based on your actual usage. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/advisor/advisor-cost-recommendations)

## Reservations and savings plans

- [ ] **Buy Azure Reservations for VMs, databases and other services that run steadily all year.**\
  Why: A one- or three-year commitment is charged at a significant discount to pay-as-you-go prices. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/cost-management-billing/reservations/save-compute-costs-reservations)
- [ ] **Use an Azure savings plan for compute when your workloads change size, region or service.**\
  Why: A savings plan applies an hourly spend commitment across eligible compute services, so it stays useful as things change. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/cost-management-billing/savings-plan/savings-plan-overview)
- [ ] **Apply Azure Hybrid Benefit to Windows Server and SQL Server workloads covered by eligible licences.**\
  Why: You stop paying for a licence you already own through Software Assurance or a subscription. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/virtual-machines/windows/hybrid-use-benefit-licensing)
- [ ] **Check reservation utilisation every month and exchange or resize reservations that are underused.**\
  Why: An unused reservation hour is lost money, because a reservation is billed whether or not it is used. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/cost-management-billing/reservations/reservation-utilization)

## Rightsizing

- [ ] **Resize or shut down VMs with consistently low CPU and memory use.**\
  Why: Many VMs are sized for a peak that never comes, and each size step down roughly halves compute cost. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/advisor/advisor-cost-recommendations)
- [ ] **Use autoscale for App Service, VM scale sets and other services with variable load.**\
  Why: Autoscale adds instances at peak and removes them when demand falls, so you do not pay for peak capacity all day. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-monitor/autoscale/autoscale-overview)
- [ ] **Run interruptible batch, test and CI work on Azure Spot VMs.**\
  Why: Spot VMs use spare capacity at a deep discount, in exchange for possible eviction. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/virtual-machines/spot-vms)
- [ ] **Check the disk type of each VM: move to Standard SSD where Premium SSD performance is not needed.**\
  Why: Premium SSD costs more per disk every month, whether or not its extra performance is used. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/virtual-machines/disks-types)

## Orphaned resources

- [ ] **Find and delete unattached managed disks.**\
  Why: A managed disk is billed for its full provisioned size even after the VM using it has been deleted. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/virtual-machines/disks-find-unattached-portal)
- [ ] **Release public IP addresses that are not associated with any resource.**\
  Why: Public IP addresses are billed by the hour while they exist, whether or not anything uses them. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/public-ip-addresses)
- [ ] **Review old disk snapshots, delete the ones you no longer need and use incremental snapshots.**\
  Why: Full snapshots are billed for the whole disk size, while incremental snapshots store only the changes. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/virtual-machines/disks-incremental-snapshots)
- [ ] **Deallocate VMs you stop, rather than only shutting them down from inside the operating system.**\
  Why: A VM that is stopped but still allocated keeps being billed for compute. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/virtual-machines/states-billing)
- [ ] **Delete empty or idle App Service plans.**\
  Why: An App Service plan is billed for its instances even when no app runs in it. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/app-service/overview-manage-costs)

## Dev and test

- [ ] **Set auto-shutdown schedules on dev and test VMs.**\
  Why: Machines used only in working hours do not need to run, and bill, through nights and weekends. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/virtual-machines/auto-shutdown-vm)
- [ ] **Run non-production subscriptions on Dev/Test pricing offers where your Visual Studio subscriptions allow it.**\
  Why: Dev/Test offers give discounted rates, including no Windows licence charge on VMs, for non-production use. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/devtest/offer/overview-what-is-devtest-offer-visual-studio)

## Storage tiers

- [ ] **Move rarely read blobs to the cool, cold or archive access tier.**\
  Why: Cooler tiers cost much less per GB to store, with higher access costs and minimum storage periods. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview)
- [ ] **Add lifecycle management rules that tier or delete blobs by age automatically.**\
  Why: Rules keep the tiering going without anyone having to remember it. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview)
- [ ] **Use locally redundant storage (LRS) where geo-redundancy is not required.**\
  Why: Geo-redundant options store extra copies in a second region and cost more per GB. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy)

## Egress

- [ ] **Keep chatty services and their data in the same region and cut unneeded cross-region and internet data transfer.**\
  Why: Data leaving a region or Azure is billed per GB, while inbound transfer is free. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/well-architected/cost-optimization/optimize-data-costs)

## Log Analytics

- [ ] **Set table-level retention to what you actually need and use long-term retention for data you keep only for compliance.**\
  Why: Retention beyond the included period is billed per GB per month. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/data-retention-configure)
- [ ] **Use the Basic or Auxiliary table plan for high-volume logs you rarely query, and a commitment tier if you ingest steadily.**\
  Why: Ingestion is usually the largest Log Analytics cost, and these options price it lower. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/cost-logs)
- [ ] **Set a daily cap on workspaces where a runaway data source could cause a surprise bill.**\
  Why: The cap stops billable ingestion for the rest of the day once the limit is reached. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/daily-cap)

## Tagging and budgets

- [ ] **Require cost-centre, owner and environment tags with Azure Policy.**\
  Why: Tags let you split the bill by team and find who owns an expensive resource. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-policies)
- [ ] **Create budgets with email alerts at 50%, 80% and 100% for each subscription or resource group.**\
  Why: Budgets warn you during the month, before an overrun reaches the invoice. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets)
- [ ] **Turn on anomaly alerts and review unexpected charges as soon as they are flagged.**\
  Why: Cost anomaly detection spots sudden spikes, such as a misconfigured scale rule, within days. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/cost-management-billing/understand/analyze-unexpected-charges)

---

Edition October 2026. Licences, portal names and defaults change; the linked Microsoft Learn pages are the authoritative source. Found an outdated check? Open an issue with the "Correction" template and include the official Microsoft Learn link.

From the [EpiFive free IT checklists](https://www.epifive.com/guides). Licensed under CC BY 4.0.
