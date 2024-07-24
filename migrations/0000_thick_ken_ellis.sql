CREATE TABLE `early_access` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`approved` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`invitation_sent_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `early_access_id_unique` ON `early_access` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `early_access_email_unique` ON `early_access` (`email`);