-- Users Table

CREATE TABLE "applications" (
	"id" serial PRIMARY KEY,
	"userId" integer NOT NULL,
	"company" text NOT NULL,
	"role" text NOT NULL,
	"status" text NOT NULL,
	"dateApplied" date NOT NULL,
	"resume" text,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "applications_status_check" CHECK ((status = ANY (ARRAY['Applied'::text, 'Screening'::text, 'Rejected'::text, 'Withdrawn'::text, 'Interview'::text, 'Offer'::text])))
);
CREATE TABLE "follow_up_notes" (
	"id" serial PRIMARY KEY,
	"applicationId" integer NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL CONSTRAINT "users_email_key" UNIQUE,
	"password" varchar(255) NOT NULL,
	"createdat" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE UNIQUE INDEX "applications_pkey" ON "applications" ("id");
CREATE UNIQUE INDEX "follow_up_notes_pkey" ON "follow_up_notes" ("id");
CREATE UNIQUE INDEX "users_email_key" ON "users" ("email");
CREATE UNIQUE INDEX "users_pkey" ON "users" ("id");
ALTER TABLE "applications" ADD CONSTRAINT "applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;
ALTER TABLE "follow_up_notes" ADD CONSTRAINT "follow_up_notes_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE;

--Meetings Table
CREATE TABLE "applications" (
	"id" serial PRIMARY KEY,
	"userId" integer NOT NULL,
	"company" text NOT NULL,
	"role" text NOT NULL,
	"status" text NOT NULL,
	"dateApplied" date NOT NULL,
	"resume" text,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "applications_status_check" CHECK ((status = ANY (ARRAY['Applied'::text, 'Screening'::text, 'Rejected'::text, 'Withdrawn'::text, 'Interview'::text, 'Offer'::text])))
);
CREATE TABLE "follow_up_notes" (
	"id" serial PRIMARY KEY,
	"applicationId" integer NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE "meetings" (
	"id" serial PRIMARY KEY,
	"date" date NOT NULL CONSTRAINT "meetings_date_key" UNIQUE,
	"meeting_type" varchar(20) NOT NULL,
	"presiding" varchar(255) NOT NULL,
	"conducting" varchar(255) NOT NULL,
	"announcements" text[] DEFAULT '{}',
	"opening_hymn" jsonb NOT NULL,
	"opening_prayer" varchar(255) NOT NULL,
	"ward_business" jsonb DEFAULT '[]',
	"stake_business" boolean DEFAULT false,
	"sacrament_hymn" jsonb NOT NULL,
	"speakers" jsonb DEFAULT '[]',
	"closing_hymn" jsonb NOT NULL,
	"closing_prayer" varchar(255) NOT NULL,
	CONSTRAINT "meetings_meeting_type_check" CHECK (((meeting_type)::text = ANY (ARRAY[('testimony'::character varying)::text, ('regular'::character varying)::text, ('stake'::character varying)::text, ('general'::character varying)::text])))
);
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL CONSTRAINT "users_email_key" UNIQUE,
	"password" varchar(255) NOT NULL,
	"createdat" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE UNIQUE INDEX "applications_pkey" ON "applications" ("id");
CREATE UNIQUE INDEX "follow_up_notes_pkey" ON "follow_up_notes" ("id");
CREATE UNIQUE INDEX "meetings_date_key" ON "meetings" ("date");
CREATE UNIQUE INDEX "meetings_pkey" ON "meetings" ("id");
CREATE UNIQUE INDEX "users_email_key" ON "users" ("email");
CREATE UNIQUE INDEX "users_pkey" ON "users" ("id");


--Meetings Content


insert into "meetings" ("id", "date", "meeting_type", "presiding", "conducting", "announcements", "opening_hymn", "opening_prayer", "ward_business", "stake_business", "sacrament_hymn", "speakers", "closing_hymn", "closing_prayer") overriding system value values (1, '2026-09-27', 'regular', 'Bishop Salas', 'Brother Jeffries', 'Ward temple night: May 17,Youth activity: May 13', '{"title":"How Firm a Foundation","number":85}', 'Brother Martinez', '[{"description":"Sustaining of Primary Secretary"}]', false, '{"title":"I Stand All Amazed","number":193}', '[{"id":1,"name":"Brother Anderson","type":"speaker","topic":"The Atonement of Jesus Christ"},{"id":2,"name":"Sister Wilson","type":"speaker","topic":"Finding Peace Through the Gospel"}]', '{"title":"O God, Our Help in Ages Past","number":227}', 'Sister Davis');
insert into "meetings" ("id", "date", "meeting_type", "presiding", "conducting", "announcements", "opening_hymn", "opening_prayer", "ward_business", "stake_business", "sacrament_hymn", "speakers", "closing_hymn", "closing_prayer") overriding system value values (2, '2026-05-17', 'regular', 'Bishop Salas', 'Bishop Salas', 'Ward picnic: May 24,Relief Society activity: May 21', '{"title":"The Spirit of God","number":2}', 'Sister Martinez', '[{"description":"Sustaining of Sunday School Presidency"}]', true, '{"title":"Reverently and Meekly Now","number":185}', '[{"id":3,"name":"Sister Thompson","type":"speaker","topic":"The Importance of Prayer"},{"id":4,"name":"Brother Lewis","type":"speaker","topic":"Strengthening Our Families"},{"id":5,"name":"Youth Choir","type":"musical-number","topic":""}]', '{"title":"Called to Serve","number":249}', 'Brother Peterson');
insert into "meetings" ("id", "date", "meeting_type", "presiding", "conducting", "announcements", "opening_hymn", "opening_prayer", "ward_business", "stake_business", "sacrament_hymn", "speakers", "closing_hymn", "closing_prayer") overriding system value values (3, '2026-05-24', 'regular', 'Bishop Salas', 'Brother Harris', 'Ward picnic today after meetings,Temple recommend interviews: May 31', '{"title":"How Firm a Foundation","number":85}', 'Brother Nelson', '[{"description":"Sustaining of New Relief Society Activity Committee"}]', false, '{"title":"While of These Emblems We Partake","number":174}', '[{"id":6,"name":"Brother Garcia","type":"speaker","topic":"Remembering the Savior"},{"id":7,"name":"Sister Clark","type":"speaker","topic":"Faith During Difficult Times"}]', '{"title":"There Is Sunshine in My Soul Today","number":227}', 'Sister Robinson');
insert into "meetings" ("id", "date", "meeting_type", "presiding", "conducting", "announcements", "opening_hymn", "opening_prayer", "ward_business", "stake_business", "sacrament_hymn", "speakers", "closing_hymn", "closing_prayer") overriding system value values (4, '2026-05-31', 'regular', 'Bishop Salas', 'Brother Jeffries', 'Youth fireside: June 7,Ward choir rehearsal: June 3', '{"title":"Come, Come, Ye Saints","number":30}', 'Sister Anderson', '[{"description":"Sustaining of Ward Activities Committee"}]', true, '{"title":"Jesus of Nazareth, Savior and King","number":181}', '[{"id":8,"name":"Brother Wilson","type":"speaker","topic":"Following the Example of Jesus Christ"},{"id":9,"name":"Sister Harris","type":"speaker","topic":"Serving Others with Love"}]', '{"title":"Press Forward, Saints","number":81}', 'Brother Clark');
insert into "meetings" ("id", "date", "meeting_type", "presiding", "conducting", "announcements", "opening_hymn", "opening_prayer", "ward_business", "stake_business", "sacrament_hymn", "speakers", "closing_hymn", "closing_prayer") overriding system value values (5, '2026-06-07', 'regular', 'Bishop Salas', 'Brother Harris', 'Ward temple night: June 14,Baptismal service: June 13', '{"title":"Come, Listen to a Prophet''s Voice","number":21}', 'Brother Taylor', '[{"description":"Sustaining of New Ward Mission Leader"}]', false, '{"title":"How Great the Wisdom and the Love","number":195}', '[{"id":10,"name":"Sister Mitchell","type":"speaker","topic":"The Blessings of the Sacrament"},{"id":11,"name":"Brother Young","type":"speaker","topic":"Living the Gospel of Jesus Christ"},{"id":12,"name":"Relief Society Choir","type":"musical-number","topic":""}]', '{"title":"Improve the Shining Moments","number":226}', 'Sister Harris');
insert into "meetings" ("id", "date", "meeting_type", "presiding", "conducting", "announcements", "opening_hymn", "opening_prayer", "ward_business", "stake_business", "sacrament_hymn", "speakers", "closing_hymn", "closing_prayer") overriding system value values (6, '2026-06-14', 'regular', 'Bishop Salas', 'Bishop Salas', 'Ward service project: June 20,Stake conference reminder: June 28', '{"title":"Truth Eternal","number":4}', 'Brother Brown', '[{"description":"Sustaining of New Elders Quorum Secretary"}]', true, '{"title":"In Memory of the Crucified","number":190}', '[{"id":13,"name":"Sister Evans","type":"speaker","topic":"Gratitude for the Savior"},{"id":14,"name":"Brother Johnson","type":"speaker","topic":"Keeping Our Covenants"}]', '{"title":"Scatter Sunshine","number":230}', 'Sister Taylor');
insert into "meetings" ("id", "date", "meeting_type", "presiding", "conducting", "announcements", "opening_hymn", "opening_prayer", "ward_business", "stake_business", "sacrament_hymn", "speakers", "closing_hymn", "closing_prayer") overriding system value values (7, '2026-06-21', 'regular', 'Bishop Salas', 'Brother Harris', 'Ward temple night: June 28,Youth activity: June 24', '{"title":"There Is Sunshine in My Soul Today","number":227}', 'Sister Johnson', '[{"description":"Sustaining of Primary Activity Day Leaders"}]', false, '{"title":"In Remembrance of Thy Suffering","number":169}', '[{"id":15,"name":"Brother Martinez","type":"speaker","topic":"Building Faith in Jesus Christ"},{"id":16,"name":"Sister Brown","type":"speaker","topic":"The Power of Service"}]', '{"title":"O God, Our Help in Ages Past","number":31}', 'Brother Taylor');
insert into "meetings" ("id", "date", "meeting_type", "presiding", "conducting", "announcements", "opening_hymn", "opening_prayer", "ward_business", "stake_business", "sacrament_hymn", "speakers", "closing_hymn", "closing_prayer") overriding system value values (8, '2026-06-28', 'regular', 'Bishop Salas', 'Brother Jeffries', 'Stake conference today,Ward barbecue: July 4', '{"title":"The Spirit of God","number":2}', 'Sister Clark', '[{"description":"Sustaining of New Young Women President"}]', true, '{"title":"I Stand All Amazed","number":193}', '[{"id":17,"name":"Sister Davis","type":"speaker","topic":"Trusting in the Lord"},{"id":18,"name":"Brother Nelson","type":"speaker","topic":"Covenants and Discipleship"},{"id":19,"name":"Youth Choir","type":"musical-number","topic":""}]', '{"title":"Press Forward, Saints","number":81}', 'Sister Martinez');
insert into "meetings" ("id", "date", "meeting_type", "presiding", "conducting", "announcements", "opening_hymn", "opening_prayer", "ward_business", "stake_business", "sacrament_hymn", "speakers", "closing_hymn", "closing_prayer") overriding system value values (9, '2026-07-05', 'regular', 'Bishop Salas', 'Brother Harris', 'Ward temple night: July 12,Youth activity: July 8', '{"title":"Come, Come, Ye Saints","number":30}', 'Brother Anderson', '[{"description":"Sustaining of New Ward Clerk"}]', false, '{"title":"While of These Emblems We Partake","number":174}', '[{"id":20,"name":"Brother Clark","type":"speaker","topic":"Remembering Our Blessings"},{"id":21,"name":"Sister Robinson","type":"speaker","topic":"Finding Joy in the Gospel"}]', '{"title":"Improve the Shining Moments","number":226}', 'Brother Garcia');
insert into "meetings" ("id", "date", "meeting_type", "presiding", "conducting", "announcements", "opening_hymn", "opening_prayer", "ward_business", "stake_business", "sacrament_hymn", "speakers", "closing_hymn", "closing_prayer") overriding system value values (10, '2026-07-12', 'regular', 'Bishop Salas', 'Bishop Salas', 'Relief Society activity: July 16,Ward service project: July 18', '{"title":"How Firm a Foundation","number":85}', 'Sister Harris', '[{"description":"Sustaining of New Relief Society Secretary"}]', true, '{"title":"Jesus of Nazareth, Savior and King","number":181}', '[{"id":22,"name":"Brother Taylor","type":"speaker","topic":"The Savior''s Example of Love"},{"id":23,"name":"Sister Mitchell","type":"speaker","topic":"Strength Through Prayer"}]', '{"title":"Called to Serve","number":249}', 'Brother Young');
insert into "meetings" ("id", "date", "meeting_type", "presiding", "conducting", "announcements", "opening_hymn", "opening_prayer", "ward_business", "stake_business", "sacrament_hymn", "speakers", "closing_hymn", "closing_prayer") overriding system value values (11, '2026-07-19', 'regular', 'Bishop Salas', 'Brother Jeffries', 'Ward temple night: July 26,Youth fireside: July 23', '{"title":"Come, Listen to a Prophet''s Voice","number":21}', 'Sister Evans', '[{"description":"Sustaining of New Primary Presidency Counselor"}]', false, '{"title":"How Great the Wisdom and the Love","number":195}', '[{"id":24,"name":"Brother Brown","type":"speaker","topic":"Following the Prophet"},{"id":25,"name":"Sister Johnson","type":"speaker","topic":"Faith in Jesus Christ"},{"id":26,"name":"Ward Choir","type":"musical-number","topic":""}]', '{"title":"Scatter Sunshine","number":230}', 'Brother Lewis');
insert into "meetings" ("id", "date", "meeting_type", "presiding", "conducting", "announcements", "opening_hymn", "opening_prayer", "ward_business", "stake_business", "sacrament_hymn", "speakers", "closing_hymn", "closing_prayer") overriding system value values (12, '2026-07-26', 'regular', 'Bishop Salas', 'Brother Harris', 'Temple recommend interviews: August 2,Ward picnic: August 1', '{"title":"Truth Eternal","number":4}', 'Brother Peterson', '[{"description":"Sustaining of New Elders Quorum Presidency Counselor"}]', true, '{"title":"In Memory of the Crucified","number":190}', '[{"id":27,"name":"Sister Thompson","type":"speaker","topic":"The Sacrament and Remembrance"},{"id":28,"name":"Brother Garcia","type":"speaker","topic":"Serving in the Lord''s Kingdom"}]', '{"title":"There Is Sunshine in My Soul Today","number":227}', 'Sister Wilson');
insert into "meetings" ("id", "date", "meeting_type", "presiding", "conducting", "announcements", "opening_hymn", "opening_prayer", "ward_business", "stake_business", "sacrament_hymn", "speakers", "closing_hymn", "closing_prayer") overriding system value values (13, '2026-08-02', 'regular', 'Bishop Salas', 'Brother Jeffries', 'Ward temple night: August 9,Youth activity: August 6', '{"title":"The Spirit of God","number":2}', 'Sister Davis', '[{"description":"Sustaining of New Sunday School Teacher"}]', false, '{"title":"In Remembrance of Thy Suffering","number":169}', '[{"id":29,"name":"Brother Anderson","type":"speaker","topic":"The Importance of Gratitude"},{"id":30,"name":"Sister Clark","type":"speaker","topic":"Choosing Faith Over Fear"}]', '{"title":"Press Forward, Saints","number":81}', 'Brother Nelson');
insert into "meetings" ("id", "date", "meeting_type", "presiding", "conducting", "announcements", "opening_hymn", "opening_prayer", "ward_business", "stake_business", "sacrament_hymn", "speakers", "closing_hymn", "closing_prayer") overriding system value values (14, '2026-08-09', 'regular', 'Bishop Salas', 'Brother Harris', 'Stake youth activity: August 15,Ward temple night: August 16', '{"title":"Come, Come, Ye Saints","number":30}', 'Brother Martinez', '[{"description":"Sustaining of New Ward Missionary"}]', true, '{"title":"Reverently and Meekly Now","number":185}', '[{"id":31,"name":"Sister Harris","type":"speaker","topic":"The Atonement of Jesus Christ"},{"id":32,"name":"Brother Johnson","type":"speaker","topic":"Keeping the Sabbath Day Holy"},{"id":33,"name":"Youth Choir","type":"musical-number","topic":""}]', '{"title":"Improve the Shining Moments","number":226}', 'Sister Brown');
insert into "meetings" ("id", "date", "meeting_type", "presiding", "conducting", "announcements", "opening_hymn", "opening_prayer", "ward_business", "stake_business", "sacrament_hymn", "speakers", "closing_hymn", "closing_prayer") overriding system value values (15, '2026-09-12', 'regular', 'Bishop Salas', 'Brother Harris', 'Ward temple night: September 20,Youth activity: September 17', '{"title":"The Spirit of God","number":2}', 'Sister Johnson', '[{"description":"Sustaining of Ward Mission Leader"}]', false, '{"title":"In Remembrance of Thy Suffering","number":169}', '[{"id":34,"name":"Sister Brown","type":"speaker","topic":"Faith in Jesus Christ"},{"id":35,"name":"Youth Choir","type":"musical-number","topic":""}]', '{"title":"O God, Our Help in Ages Past","number":31}', 'Brother Taylor');
insert into "meetings" ("id", "date", "meeting_type", "presiding", "conducting", "announcements", "opening_hymn", "opening_prayer", "ward_business", "stake_business", "sacrament_hymn", "speakers", "closing_hymn", "closing_prayer") overriding system value values (16, '2026-09-16', 'regular', 'Joseph Salas', 'Joseph Salas', '', '{"title":"The Spirit of God","number":2}', 'TBA', '[{"description":""},{"description":"TBA"}]', false, '{"title":"In Remembrance of Thy Suffering","number":169}', '[{"id":1,"name":"TBA","type":"speaker","topic":"TBA"}]', '{"title":"O God, Our Help in Ages Past","number":31}', 'TBA');

