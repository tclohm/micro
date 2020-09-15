# Migration `20200914195323-init`

This migration has been generated at 9/14/2020, 12:53:23 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE SEQUENCE "userresult_id_seq";
ALTER TABLE "public"."UserResult" ALTER COLUMN "id" SET DEFAULT nextval('userresult_id_seq');
ALTER SEQUENCE "userresult_id_seq" OWNED BY "public"."UserResult"."id"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200914195323-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,60 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model Cheers {
+  id           Int         @default(autoincrement()) @id
+  userId       Int?
+  userResultId Int?
+  cheered      Boolean     @default(false)
+  user         User?       @relation(fields: [userId], references: [id])
+  result       UserResult? @relation(fields: [userResultId], references: [id])
+}
+
+model Post {
+  id        Int          @default(autoincrement()) @id
+  title     String
+  content   String
+  edited    Boolean?     @default(false)
+  userId    Int?
+  createdAt DateTime?
+  user      User?        @relation(fields: [userId], references: [id])
+  results   UserResult[]
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
+model User {
+  id       Int          @default(autoincrement()) @id
+  name     String
+  email    String       @unique
+  username String       @unique
+  password String?
+  cheers   Cheers[]
+  posts    Post[]
+  profile  Profile[]
+  results  UserResult[]
+}
+
+model UserResult {
+  id     Int      @default(autoincrement()) @id
+  failed Boolean? @default(true)
+  userId Int?
+  postId Int?
+  post   Post?    @relation(fields: [postId], references: [id])
+  user   User?    @relation(fields: [userId], references: [id])
+  cheers Cheers[]
+}
```


