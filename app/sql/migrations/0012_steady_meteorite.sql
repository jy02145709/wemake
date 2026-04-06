ALTER TABLE "products" DROP CONSTRAINT "products_profile_id_profile_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_to_profile" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;