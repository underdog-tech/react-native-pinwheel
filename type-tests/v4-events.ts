import type { EventHandler } from "../src/client-events/registry/v4";


const handleEvent: EventHandler = () => undefined;

handleEvent("bill_switch_failure", {
  platformId: "platform-id",
  platformName: "Platform",
  isIntegratedSwitch: true,
  frequency: "monthly",
  nextPaymentDate: "2026-05-08",
  amountCents: 1200,
  accountId: "account-id",
});

handleEvent("bill_added", {
  platformId: "platform-id",
  platformName: "Platform",
  frequency: "monthly",
  nextPaymentDate: "2026-05-08",
  amountCents: 1200,
});

handleEvent("bill_edited", {
  platformId: "platform-id",
  platformName: "Platform",
  frequency: "monthly",
  nextPaymentDate: "2026-05-08",
  amountCents: 1200,
});

handleEvent("bill_marked_inactive", {
  platformId: "platform-id",
  platformName: "Platform",
  frequency: "monthly",
  nextPaymentDate: "2026-05-08",
  amountCents: 1200,
});

handleEvent("bill_switch_platforms_added", {
  platforms: [{ id: "platform-id", name: "Platform" }],
});

handleEvent("bill_switch_platforms_removed", {
  platforms: [{ id: "platform-id", name: "Platform" }],
});

handleEvent("bill_cancel_success", {
  platformId: "platform-id",
  platformName: "Platform",
  isIntegratedSwitch: true,
  frequency: "monthly",
  nextPaymentDate: "2026-05-08",
  amountCents: 1200,
});

handleEvent("bill_cancel_failure", {
  platformId: "platform-id",
  platformName: "Platform",
  isIntegratedSwitch: true,
  frequency: "monthly",
  nextPaymentDate: "2026-05-08",
  amountCents: 1200,
});

handleEvent("calendar_sync", {
  calendarType: "google",
});

handleEvent("calendar_sync", {
  calendarType: "outlook",
});

handleEvent("customer_terms_accepted", {});

handleEvent("user_activated", {
  solutionName: "Bill Switch",
});
