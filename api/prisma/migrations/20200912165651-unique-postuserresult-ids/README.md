# Migration `20200912165651-unique-postuserresult-ids`

This migration has been generated at 9/12/2020, 9:56:51 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE SEQUENCE "postuserresult_id_seq";
ALTER TABLE "public"."PostUserResult" ALTER COLUMN "id" SET DEFAULT nextval('postuserresult_id_seq');
ALTER SEQUENCE "postuserresult_id_seq" OWNED BY "public"."PostUserResult"."id"

CREATE UNIQUE INDEX "PostUserResult.postId_resultId_userId_unique" ON "public"."PostUserResult"("postId", "resultId", "userId")

ALTER INDEX "public"."User_email_key" RENAME TO "User.email_unique"

ALTER INDEX "public"."User_username_key" RENAME TO "User.username_unique"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200912165651-unique-postuserresult-ids
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,58 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model Post {
+  id             Int              @default(autoincrement()) @id
+  title          String
+  content        String
+  createdAt      DateTime?        @default(dbgenerated())
+  edited         Boolean?         @default(false)
+  authorId       Int?
+  author         User?            @relation(fields: [authorId], references: [id])
+  postUserResult PostUserResult[]
+}
+
+model PostUserResult {
+  id       Int     @default(autoincrement()) @id
+  postId   Int?
+  resultId Int?
+  userId   Int?
+  post     Post?   @relation(fields: [postId], references: [id])
+  result   Result? @relation(fields: [resultId], references: [id])
+  user     User?   @relation(fields: [userId], references: [id])
+
+  @@unique([postId, resultId, userId])
+}
+
+model Profile {
+  id            Int     @default(autoincrement()) @id
+  bio           String?
+  userId        Int?
+  twitterHandle String?
+  googleHandle  String?
+  githubHandle  String?
+  user          User?   @relation(fields: [userId], references: [id])
+}
+
+model Result {
+  id             Int              @default(autoincrement()) @id
+  failed         Boolean?         @default(true)
+  postUserResult PostUserResult[]
+}
+
+model User {
+  id              Int              @default(autoincrement()) @id
+  name            String
+  email           String           @unique
+  username        String           @unique
+  password        String?
+  posts           Post[]
+  postUserResults PostUserResult[]
+  profile         Profile[]
+}
```


