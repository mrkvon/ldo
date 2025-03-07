import type { UnexpectedResourceError } from "../../../requester/results/error/ErrorResult";
import { ResourceError } from "../../../requester/results/error/ErrorResult";

export type NotificationCallbackError =
  | DisconnectedAttemptingReconnectError
  | DisconnectedNotAttemptingReconnectError
  | UnsupportedNotificationError
  | UnexpectedResourceError;

/**
 * Indicates that the requested method for receiving notifications is not
 * supported by this Pod.
 */
export class UnsupportedNotificationError extends ResourceError {
  readonly type = "unsupportedNotificationError" as const;
}

/**
 * Indicates that the socket has disconnected and is attempting to reconnect.
 */
export class DisconnectedAttemptingReconnectError extends ResourceError {
  readonly type = "disconnectedAttemptingReconnectError" as const;
}

/**
 * Indicates that the socket has disconnected and is attempting to reconnect.
 */
export class DisconnectedNotAttemptingReconnectError extends ResourceError {
  readonly type = "disconnectedNotAttemptingReconnectError" as const;
}
