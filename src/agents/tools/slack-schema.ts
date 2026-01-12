import { Type } from "@sinclair/typebox";

import { createReactionSchema } from "./reaction-schema.js";

export const SlackToolSchema = Type.Union([
  createReactionSchema({
    ids: {
      channelId: Type.String(),
      messageId: Type.String(),
    },
    includeRemove: true,
    extras: {
      accountId: Type.Optional(Type.String()),
    },
  }),
  Type.Object({
    action: Type.Literal("reactions"),
    channelId: Type.String(),
    messageId: Type.String(),
    accountId: Type.Optional(Type.String()),
  }),
  Type.Object({
    action: Type.Literal("sendMessage"),
    to: Type.String(),
    content: Type.String(),
    mediaUrl: Type.Optional(Type.String()),
    threadTs: Type.Optional(Type.String()),
    accountId: Type.Optional(Type.String()),
  }),
  Type.Object({
    action: Type.Literal("editMessage"),
    channelId: Type.String(),
    messageId: Type.String(),
    content: Type.String(),
    accountId: Type.Optional(Type.String()),
  }),
  Type.Object({
    action: Type.Literal("deleteMessage"),
    channelId: Type.String(),
    messageId: Type.String(),
    accountId: Type.Optional(Type.String()),
  }),
  Type.Object({
    action: Type.Literal("readMessages"),
    channelId: Type.String(),
    limit: Type.Optional(Type.Number()),
    before: Type.Optional(Type.String()),
    after: Type.Optional(Type.String()),
    accountId: Type.Optional(Type.String()),
  }),
  Type.Object({
    action: Type.Literal("pinMessage"),
    channelId: Type.String(),
    messageId: Type.String(),
    accountId: Type.Optional(Type.String()),
  }),
  Type.Object({
    action: Type.Literal("unpinMessage"),
    channelId: Type.String(),
    messageId: Type.String(),
    accountId: Type.Optional(Type.String()),
  }),
  Type.Object({
    action: Type.Literal("listPins"),
    channelId: Type.String(),
    accountId: Type.Optional(Type.String()),
  }),
  Type.Object({
    action: Type.Literal("memberInfo"),
    userId: Type.String(),
    accountId: Type.Optional(Type.String()),
  }),
  Type.Object({
    action: Type.Literal("emojiList"),
    accountId: Type.Optional(Type.String()),
  }),
  Type.Object({
    action: Type.Literal("channels.list"),
    limit: Type.Optional(Type.Number({ description: "Page size (default 200)" })),
    cursor: Type.Optional(Type.String({ description: "Pagination cursor" })),
    types: Type.Optional(Type.String({ description: "Comma-separated Slack conversation types (e.g. public_channel,private_channel)" })),
    excludeArchived: Type.Optional(Type.Boolean({ description: "Exclude archived channels (default true)" })),
  }),
]);
