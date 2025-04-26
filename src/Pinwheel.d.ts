import React from 'react';
import { LinkOptions } from './client-events/client';
declare const Pinwheel: ({ linkToken, onLogin, onLoginAttempt, onSuccess, onError, onExit, onEvent, handleInsets, useDarkMode, }: LinkOptions & {
    handleInsets?: boolean;
    useDarkMode?: boolean;
}) => React.JSX.Element;
export default Pinwheel;
