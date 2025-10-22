import type { AdditionsType, ModificationsType, RemovalsType } from '../utils';
export type PinwheelErrorType = 'sandboxError' | 'clientError' | 'systemError' | 'userActionRequired' | 'platformError' | 'invalidAccountsConfiguration' | 'invalidUserInput' | 'invalidLinkToken' | 'networkError';
export type LinkApiJob = 'login' | 'direct_deposit_switch' | 'card_switch';
export type OpenEventPayload = {};
export type SelectEmployerEventPayload = {
    selectedEmployerId: string;
    selectedEmployerName: string;
};
export type SelectPlatformEventPayload = {
    selectedPlatformId: string;
    selectedPlatformName: string;
};
export type IncorrectPlatformGivenEventPayload = {};
export type LoginAttemptEventPayload = {
    platformId: string;
};
export type LoginEventPayload = {
    accountId: string;
    platformId: string;
};
export type InputAmountEventPayload = {
    value: number;
    unit: '$' | '%';
};
type _PartialSwitch<T> = {
    action: 'partial_switch';
    allocation: T;
};
type InputAllocationPercentage = _PartialSwitch<{
    type: 'percentage';
    value: number;
}>;
type InputAllocationAmount = _PartialSwitch<{
    type: 'amount';
    value: number;
}>;
type InputAllocationRemainder = _PartialSwitch<{
    type: 'remainder';
}>;
export type InputAllocationEventPayload = {
    action: 'full_switch';
} | InputAllocationRemainder | InputAllocationAmount | InputAllocationPercentage;
/**
 * @deprecated - Use `InputAllocationEventPayload` instead.
 */
export type InputAllocation = InputAllocationEventPayload;
export type CardSwitchBeginEventPayload = {};
export type DocUploadsBeginEventPayload = {
    uploadedDocumentsSubmittedCount?: number;
};
export type DocUploadsSubmittedEventPayload = {
    uploadedDocumentSubmittedCount: number;
};
export type DdFormBeginEventPayload = {};
export type DdFormCreateEventPayload = {
    url: string;
};
export type DdFormDownloadEventPayload = {};
export type ScreenTransitionEventPayload = {
    screenName: string;
    selectedEmployerId?: string;
    selectedEmployerName?: string;
    selectedPlatformId?: string;
    selectedPlatformName?: string;
};
/**
 * @deprecated - Use `ScreenTransitionEventPayload` instead.
 */
export type ScreenTransition = ScreenTransitionEventPayload;
export type ExitEventPayload = Record<string, never>;
export type SuccessEventPayload = {
    accountId: string;
    platformId: string;
    job: LinkApiJob;
    params?: {
        amount?: {
            value: number;
            unit: '%' | '$';
        };
    };
};
export type ErrorEventPayload = {
    type: PinwheelErrorType;
    code: string;
    message: string;
    pendingRetry: boolean;
};
export type OtherEventPayload = {
    name: string;
    payload: {
        key: string;
        value: string;
        type: 'string' | 'boolean' | 'number';
    }[];
};
export type BillSwitchPayload = {
    platformId: string;
    platformName: string;
    isGuidedSwitch: boolean;
    isIntegratedSwitch: boolean;
    frequency: string;
    nextPaymentDate: string;
    amountCents: number;
};
export type ExternalAccountConnectedPayload = {
    institutionName: string;
    accountName: string;
};
/**
 * @deprecated - Use `ErrorEventPayload` instead.
 */
export type PinwheelError = ErrorEventPayload;
type EventPayloadAdditions = {
    open: OpenEventPayload;
    select_employer: SelectEmployerEventPayload;
    select_platform: SelectPlatformEventPayload;
    incorrect_platform_given: IncorrectPlatformGivenEventPayload;
    login_attempt: LoginAttemptEventPayload;
    login: LoginEventPayload;
    input_amount: InputAmountEventPayload;
    input_allocation: InputAllocationEventPayload;
    card_switch_begin: CardSwitchBeginEventPayload;
    doc_uploads_begin: DocUploadsBeginEventPayload;
    doc_uploads_submitted: DocUploadsSubmittedEventPayload;
    dd_form_begin: DdFormBeginEventPayload;
    dd_form_create: DdFormCreateEventPayload;
    dd_form_download: DdFormDownloadEventPayload;
    screen_transition: ScreenTransitionEventPayload;
    exit: ErrorEventPayload | ExitEventPayload;
    other_event: OtherEventPayload;
    success: SuccessEventPayload;
    error: ErrorEventPayload;
    bill_switch_success: BillSwitchPayload;
    bill_removed: BillSwitchPayload;
    external_account_connected: ExternalAccountConnectedPayload;
    merchant_login_success: LoginEventPayload;
};
type EventPayloadModifications = {};
type EventPayloadRemovals = [];
export type EventPayloadMap = Omit<AdditionsType<EventPayloadAdditions> & ModificationsType<EventPayloadModifications>, keyof RemovalsType<EventPayloadRemovals>>;
export type EventHandler = <T extends keyof EventPayloadMap>(eventName: T, payload: EventPayloadMap[T]) => void;
export {};
