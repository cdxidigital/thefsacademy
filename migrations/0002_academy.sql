-- Learner records. user_id is the verified sign-in id, never a client-supplied value.
create table if not exists profiles (
  user_id text primary key,
  display_name text not null,
  weekly_goal integer not null default 3,
  accepted_version text not null,
  adult_confirmed_at text not null,
  education_acknowledged_at text not null,
  orientation_completed_at text,
  external_ai_consent_at text,
  active_assessment_id text,
  tutor_credits integer not null default 0,
  created_at text not null,
  updated_at text not null
);

create table if not exists demo_sessions (
  token_hash text primary key,
  owner_user_id text not null unique,
  demo_user_id text not null unique references profiles(user_id) on delete cascade,
  created_at text not null,
  expires_at text not null
);

create table if not exists lesson_progress (
  user_id text not null references profiles(user_id) on delete cascade,
  lesson_id text not null,
  completed_at text not null,
  primary key (user_id, lesson_id)
);

create table if not exists assessment_attempts (
  id text primary key,
  user_id text not null references profiles(user_id) on delete cascade,
  assessment_id text not null,
  score integer not null,
  total integer not null,
  passed boolean not null,
  critical_passed boolean not null,
  created_at text not null
);

create table if not exists assessment_results (
  user_id text not null references profiles(user_id) on delete cascade,
  assessment_id text not null,
  best_score integer not null,
  total integer not null,
  passed_at text,
  last_attempt_at text not null,
  primary key (user_id, assessment_id)
);

create table if not exists entitlements (
  user_id text not null references profiles(user_id) on delete cascade,
  key text not null,
  source_id text not null,
  expires_at text,
  active boolean not null default true,
  updated_at text not null,
  primary key (user_id, key, source_id)
);

create table if not exists tutor_usage (
  user_id text not null references profiles(user_id) on delete cascade,
  bucket text not null,
  count integer not null default 0,
  primary key (user_id, bucket)
);

create table if not exists certificates (
  user_id text primary key references profiles(user_id) on delete cascade,
  id text not null unique,
  display_name text not null,
  course_version text not null,
  issued_at text not null
);

create index if not exists lesson_progress_user_idx on lesson_progress (user_id);
create index if not exists assessment_attempts_user_idx on assessment_attempts (user_id, created_at);
