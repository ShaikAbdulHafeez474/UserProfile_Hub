CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"profile_picture" text,
	"signature" text,
	"first_name" text,
	"last_name" text,
	"email" text,
	"phone" text,
	"address" text,
	"employer" text,
	"position" text,
	"onboarding_status" text DEFAULT 'pending',
	"additional_info" json,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
