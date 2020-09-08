# Migration `20200908004758-add-social`

This migration has been generated at 9/7/2020, 5:47:58 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT
)

CREATE TABLE "Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bio" TEXT,
    "name" TEXT,
    "username" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "socialId" INTEGER,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("socialId") REFERENCES "Social"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,

    FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "Result" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "result" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "Social" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "google" TEXT,
    "github" TEXT,
    "twitter" TEXT
)

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")

CREATE UNIQUE INDEX "Profile.username_unique" ON "Profile"("username")

CREATE UNIQUE INDEX "Profile_userId_unique" ON "Profile"("userId")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200907232126-init..20200908004758-add-social
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
 	provider = "sqlite"
-	url = "***"
+	url = "***"
 }
 generator client {
 	provider = "prisma-client-js"
@@ -9,19 +9,21 @@
 model User {
 	id 			Int 		@default(autoincrement()) @id
 	email		String		@unique
-	password	String
+	password	String?
 	profile 	Profile?
 }
 model Profile {
 	id 			Int			@default(autoincrement()) @id
 	bio 		String?
 	name		String?
-	username 	String 		@unique
+	username 	String	 	@unique
 	user 		User 		@relation(fields: [userId], references: [id])	
 	userId		Int	
+	social 		Social? 	@relation(fields: [socialId], references: [id])
+	socialId 	Int?
 	posts		Post[]
 }
 model Post {
@@ -41,5 +43,12 @@
 	user 		Profile 	@relation(fields: [userId], references: [id])
 	userId		Int
 	post 		Post 		@relation(fields: [postId], references: [id])
 	postId		Int
+}
+
+model Social {
+	id 			Int 		@default(autoincrement()) @id
+	google		String?
+	github		String?
+	twitter		String?
 }
```


