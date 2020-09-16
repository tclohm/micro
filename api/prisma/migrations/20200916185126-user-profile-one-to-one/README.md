# Migration `20200916185126-user-profile-one-to-one`

This migration has been generated at 9/16/2020, 11:51:26 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER INDEX "public"."Profile_userId_key" RENAME TO "Profile.userId_unique"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200916175007-profile-user-one-to-one..20200916185126-user-profile-one-to-one
--- datamodel.dml
+++ datamodel.dml
@@ -3,26 +3,25 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Profile {
-  id                           Int     @default(autoincrement()) @id
-  bio                          String?
-  userId                       Int?    @unique
-  twitterHandle                String?
-  googleHandle                 String?
-  githubHandle                 String?
-  user                         User?
+  id            Int     @default(autoincrement()) @id
+  bio           String?
+  userId        Int     @default(dbgenerated()) @unique
+  twitterHandle String?
+  googleHandle  String?
+  githubHandle  String?
+  user          User    @relation(fields: [userId], references: [id])
 }
 model User {
-  id                              Int      @default(autoincrement()) @id
-  name                            String
-  email                           String   @unique
-  username                        String   @unique
-  password                        String?
-  profileId                       Int?     
-  profile                         Profile? @relation(fields: [profileId], references: [id])
+  id       Int      @default(autoincrement()) @id
+  name     String
+  email    String   @unique
+  username String   @unique
+  password String?
+  profile  Profile
 }
```


