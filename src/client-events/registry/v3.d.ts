import type { AdditionsType, ModificationsType, RemovalsType } from '../utils';
import type { EventPayloadMap as EventPayloadMapV2, LinkApiJob } from './v2.3';
import { InputAllocationEventPayload as InputAllocationEventPayload2_3 } from './v2.3';
export * from './v2.3';
export type SuccessEventPayload = {
    accountId: string;
    platformId: string;
    job: LinkApiJob;
    params?: InputAllocationEventPayload;
};
export type InputAllocationEventPayload = {
    action: null;
    allocation: null;
} | InputAllocationEventPayload2_3;
/**
 * @deprecated - Use `InputAllocationEventPayload` instead.
 */
export type InputAllocation = InputAllocationEventPayload;
type EventPayloadAdditions = {};
type EventPayloadModifications = {
    input_allocation: InputAllocationEventPayload;
};
type EventPayloadRemovals = ['input_amount'];
export type EventPayloadMap = Omit<EventPayloadMapV2 & AdditionsType<EventPayloadAdditions> & ModificationsType<EventPayloadModifications>, keyof RemovalsType<EventPayloadRemovals>>;
export type EventHandler = <T extends keyof EventPayloadMap>(eventName: T, payload: EventPayloadMap[T]) => void;
