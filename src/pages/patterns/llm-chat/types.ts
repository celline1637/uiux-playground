export type MessageRole = "user" | "assistant";

export type MessageStatus = "READY" | "STREAMING" | "COMPLETED" | "FAILED" | "CANCELLED";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  status: MessageStatus;
  timestamp: number;
}

