import type { UnexpectedResourceError } from "../../requester/results/error/ErrorResult";
import type { SolidLdoDatasetContext } from "../../SolidLdoDatasetContext";
import type { Resource } from "../Resource";
import type { NotificationMessage } from "./NotificationMessage";
import type { UnsupportedNotificationError } from "./results/NotificationErrors";
import type { SubscribeToNotificationSuccess } from "./results/SubscribeToNotificationSuccess";
import type { UnsubscribeToNotificationSuccess } from "./results/UnsubscribeFromNotificationSuccess";

export type OpenSubscriptionResult =
  | SubscribeToNotificationSuccess
  | UnsupportedNotificationError
  | UnexpectedResourceError;

export type CloseSubscriptionResult =
  | UnsubscribeToNotificationSuccess
  | UnexpectedResourceError;

export abstract class NotificationSubscription {
  protected resource: Resource;
  protected onNotification: (message: NotificationMessage) => void;
  protected onError?: (err: Error) => void;
  protected context: SolidLdoDatasetContext;

  constructor(
    resource: Resource,
    onNotification: (message: NotificationMessage) => void,
    onError: ((err: Error) => void) | undefined,
    context: SolidLdoDatasetContext,
  ) {
    this.resource = resource;
    this.onNotification = onNotification;
    this.onError = onError;
    this.context = context;
  }

  abstract open(): Promise<OpenSubscriptionResult>;
  abstract close(): Promise<CloseSubscriptionResult>;
}
