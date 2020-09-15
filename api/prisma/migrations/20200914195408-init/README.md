# Migration `20200914195408-init`

This migration has been generated at 9/14/2020, 12:54:08 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE SEQUENCE "userresult_id_seq";
ALTER TABLE "public"."UserResult" ALTER COLUMN "id" SET DEFAULT nextval('userresult_id_seq');
ALTER SEQUENCE "userresult_id_seq" OWNED BY "public"."UserResult"."id"

CREATE UNIQUE INDEX "Profile_userId_unique" ON "public"."Profile"("userId")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200914195323-init..20200914195408-init
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
-  profile  Profile[]
+  profile  Profile
   results  UserResult[]
 }
 model UserResult {
```


