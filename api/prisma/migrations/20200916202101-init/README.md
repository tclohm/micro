# Migration `20200916202101-init`

This migration has been generated at 9/16/2020, 1:21:01 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER INDEX "public"."Profile_userId_key" RENAME TO "Profile.userId_unique"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200916202101-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,27 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model Profile {
+  id            Int     @default(autoincrement()) @id
+  bio           String?
+  userId        Int     @unique
+  twitterHandle String?
+  googleHandle  String?
+  githubHandle  String?
+  user          User    @relation(fields: [userId], references: [id])
+}
+
+model User {
+  id       Int      @default(autoincrement()) @id
+  name     String
+  email    String   @unique
+  username String   @unique
+  password String?
+  profile  Profile
+}
```


