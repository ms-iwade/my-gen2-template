import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { functionWithDataAccess } from "../function/functionWithDataAccess/resource";

const schema = a
  .schema({
    Todo: a
      .model({
        content: a.string(),
        status: a.enum(["PENDING", "COMPLETED"]),
        createdAt: a.datetime(),
      })
      .secondaryIndexes((index) => [
        index("status").sortKeys(["createdAt"]).queryField("todosByStatus"),
      ])
      .authorization((allow) => [allow.authenticated()]),

    createCustomTodo: a
      .mutation()
      .arguments({
        content: a.string().required(),
        status: a.enum(["PENDING", "COMPLETED"]),
      })
      .returns(a.json())
      .authorization((allow) => [allow.authenticated()])
      .handler(a.handler.function(functionWithDataAccess)),

    // 上記はサンプルコードです。開発の際はここより下に追加してください。
  })
  .authorization((allow) => [
    allow.resource(functionWithDataAccess).to(["mutate"]),
  ]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
