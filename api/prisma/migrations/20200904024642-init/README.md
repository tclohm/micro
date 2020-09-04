# Migration `20200904024642-init`

This migration has been generated at 9/3/2020, 7:46:42 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Post" (
"id" SERIAL,
"title" text   NOT NULL ,
"content" text   ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"userId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Result" (
"id" SERIAL,
"result" text   NOT NULL ,
"userId" integer   NOT NULL ,
"postId" integer   NOT NULL ,
PRIMARY KEY ("userId","postId")
)

CREATE TABLE "public"."User" (
"id" SERIAL,
"email" text   NOT NULL ,
"username" text   NOT NULL ,
"password" text   NOT NULL ,
"name" text   ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

CREATE UNIQUE INDEX "User.username_unique" ON "public"."User"("username")

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Result" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Result" ADD FOREIGN KEY ("postId")REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200904024642-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,39 @@
+datasource db {
+	provider = "postgres"
+	url = "***"
+}
+
+generator client {
+	provider = "prisma-client-js"
+}
+
+model Post {
+	id			Int			@default(autoincrement()) @id
+	title		String
+	content		String?
+	createdAt	DateTime	@default(now())
+	updatedAt 	DateTime 	@default(now())
+	user 		User 		@relation(fields: [userId], references: [id])
+	userId		Int
+	results  	Result[]
+}
+
+model Result {
+	id 			Int			@default(autoincrement())
+	result 		String
+	user 		User 		@relation(fields: [userId], references: [id])
+	userId		Int
+	post 		Post 		@relation(fields: [postId], references: [id])
+	postId		Int
+
+	@@id([userId, postId])
+}
+
+model User {
+	id 			Int 		@default(autoincrement()) @id
+	email		String		@unique
+	username	String		@unique
+	password	String
+	name		String?
+	posts 		Post[]
+}
```


