import type { AdditionsType, ModificationsType, RemovalsType } from '../utils';
import type { BillSwitchPayload, EventPayloadMap as EventPayloadMapV3 } from './v3';
export * from './v3';
export type BillSwitchEventPayload = BillSwitchPayload & {
    accountId?: string;
};
export type BillEventPayload = {
    platformId: string;
    platformName: string;
    frequency: string;
    nextPaymentDate: string;
    amountCents: number;
};
export type BillSwitchPlatform = {
    id: string;
    name: string;
};
export type BillSwitchPlatformsPayload = {
    platforms: BillSwitchPlatform[];
};
export type CalendarSyncEventPayload = {
    calendarType: 'google' | 'outlook';
};
export type CustomerTermsAcceptedEventPayload = Record<string, never>;
export type UserActivatedEventPayload = {
    solutionName: string;
};
type EventPayloadAdditions = {
    bill_switch_failure: BillSwitchEventPayload;
    bill_added: BillEventPayload;
    bill_edited: BillEventPayload;
    bill_marked_inactive: BillEventPayload;
    bill_switch_platforms_added: BillSwitchPlatformsPayload;
    bill_switch_platforms_removed: BillSwitchPlatformsPayload;
    bill_cancel_success: BillSwitchEventPayload;
    bill_cancel_failure: BillSwitchEventPayload;
    calendar_sync: CalendarSyncEventPayload;
    customer_terms_accepted: CustomerTermsAcceptedEventPayload;
    user_activated: UserActivatedEventPayload;
};
type EventPayloadModifications = {
    bill_removed: BillEventPayload;
    bill_switch_success: BillSwitchEventPayload;
};
type EventPayloadRemovals = [];
export type EventPayloadMap = Omit<EventPayloadMapV3 & AdditionsType<EventPayloadAdditions> & ModificationsType<EventPayloadModifications>, keyof RemovalsType<EventPayloadRemovals>>;
export type EventHandler = <T extends keyof EventPayloadMap>(eventName: T, payload: EventPayloadMap[T]) => void;
