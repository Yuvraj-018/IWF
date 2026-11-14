// Custom event bus for central API auth interception
export type ReauthResolver = (success: boolean) => void;

interface ReauthRequest {
  resolve: (value: boolean) => void;
  reject: (reason?: any) => void;
}

class AuthEventEmitter {
  private reauthListeners: Array<(pendingCount: number) => void> = [];
  private tokenRevokedListeners: Array<() => void> = [];
  private pendingReauthQueue: ReauthRequest[] = [];
  private isReauthPromptOpen = false;

  onReauthRequired(listener: (pendingCount: number) => void) {
    this.reauthListeners.push(listener);
    return () => {
      this.reauthListeners = this.reauthListeners.filter((l) => l !== listener);
    };
  }

  onTokenRevoked(listener: () => void) {
    this.tokenRevokedListeners.push(listener);
    return () => {
      this.tokenRevokedListeners = this.tokenRevokedListeners.filter((l) => l !== listener);
    };
  }

  notifyTokenRevoked() {
    this.tokenRevokedListeners.forEach((l) => l());
  }

  requestReauth(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.pendingReauthQueue.push({ resolve, reject });
      if (!this.isReauthPromptOpen) {
        this.isReauthPromptOpen = true;
        this.reauthListeners.forEach((l) => l(this.pendingReauthQueue.length));
      }
    });
  }

  resolveReauth(success: boolean) {
    this.isReauthPromptOpen = false;
    const queue = [...this.pendingReauthQueue];
    this.pendingReauthQueue = [];

    queue.forEach(({ resolve, reject }) => {
      if (success) {
        resolve(true);
      } else {
        reject(new Error("Re-authentication was cancelled or failed."));
      }
    });
  }
}

export const authEvents = new AuthEventEmitter();

