# Migration `20200914195641-profile-nullable`

This migration has been generated at 9/14/2020, 12:56:41 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200914195408-init..20200914195641-profile-nullable
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Cheers {
   id           Int         @default(autoincrement()) @id
@@ -44,9 +44,9 @@
   username String       @unique
   password String?
   cheers   Cheers[]
   posts    Post[]
-  profile  Profile
+  profile  Profile?
   results  UserResult[]
 }
 model UserResult {
```


