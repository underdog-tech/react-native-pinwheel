import type { LoginEventPayload, SuccessEventPayload, EventHandler, ErrorEventPayload, LoginAttemptEventPayload } from './registry/v3';
export type LinkOptions = {
    linkToken: string;
    useSecureOrigin?: boolean;
    onLogin?: (payload: LoginEventPayload) => void;
    onLoginAttempt?: (payload: LoginAttemptEventPayload) => void;
    onSuccess?: (payload: SuccessEventPayload) => void;
    onError?: (error: ErrorEventPayload) => void;
    onExit?: (error?: ErrorEventPayload) => void;
    onEvent?: EventHandler;
};
