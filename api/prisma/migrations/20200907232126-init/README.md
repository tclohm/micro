# Migration `20200907232126-init`

This migration has been generated at 9/7/2020, 4:21:26 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
)

CREATE TABLE "Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bio" TEXT,
    "name" TEXT,
    "username" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
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

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")

CREATE UNIQUE INDEX "Profile.username_unique" ON "Profile"("username")

CREATE UNIQUE INDEX "Profile_userId_unique" ON "Profile"("userId")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200907232126-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,45 @@
+datasource db {
+	provider = "sqlite"
+	url = "***"
+}
+
+generator client {
+	provider = "prisma-client-js"
+}
+
+model User {
+	id 			Int 		@default(autoincrement()) @id
+	email		String		@unique
+	password	String
+	profile 	Profile?
+}
+
+model Profile {
+	id 			Int			@default(autoincrement()) @id
+	bio 		String?
+	name		String?
+	username 	String 		@unique
+	user 		User 		@relation(fields: [userId], references: [id])	
+	userId		Int	
+	posts		Post[]
+}
+
+model Post {
+	id			Int			@default(autoincrement()) @id
+	title		String
+	content		String?
+	createdAt	DateTime	@default(now())
+	updatedAt 	DateTime 	@default(now())
+	author 		Profile 	@relation(fields: [authorId], references: [id])
+	authorId	Int
+	results  	Result[]
+}
+
+model Result {
+	id 			Int			@default(autoincrement()) @id 
+	result 		String
+	user 		Profile 	@relation(fields: [userId], references: [id])
+	userId		Int
+	post 		Post 		@relation(fields: [postId], references: [id])
+	postId		Int
+}
```


