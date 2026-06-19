-- ============================================================
-- IVAWORKS — tables only (Hostinger / shared hosting)
--
-- In phpMyAdmin:
--   1. Click YOUR database in the left sidebar (e.g. u975641965_ivaworks)
--   2. Import this file (NOT schema.sql)
--
-- Do not use CREATE DATABASE or USE — Hostinger assigns the database for you.
-- ============================================================

-- ------------------------------------------------------------
-- admins: role-ready authentication (admin | super_admin)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admins (
  id            INT UNSIGNED      NOT NULL AUTO_INCREMENT,
  username      VARCHAR(100)      NOT NULL,
  email         VARCHAR(255)      NOT NULL,
  password_hash VARCHAR(255)      NOT NULL,
  role          ENUM('admin', 'super_admin') NOT NULL DEFAULT 'admin',
  is_active     TINYINT(1)        NOT NULL DEFAULT 1,
  created_at    TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admins_username (username),
  UNIQUE KEY uq_admins_email (email),
  KEY idx_admins_role (role),
  KEY idx_admins_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- jobs: employment listings with publish workflow
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS jobs (
  id               INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  title            VARCHAR(255)  NOT NULL,
  slug             VARCHAR(255)  NOT NULL,
  category         ENUM('Consulting', 'Staffing', 'Technology') NOT NULL,
  type             ENUM('Full-time', 'Contract', 'Remote', 'Part-time') NOT NULL,
  location         VARCHAR(255)  NOT NULL,
  experience       VARCHAR(100)  NOT NULL,
  description      TEXT          NOT NULL,
  skills           JSON          NOT NULL,
  responsibilities JSON          NOT NULL,
  requirements     JSON          NOT NULL,
  what_we_offer    JSON          NOT NULL,
  status           ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  published_at     TIMESTAMP     NULL DEFAULT NULL,
  created_at       TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_jobs_slug (slug),
  KEY idx_jobs_status (status),
  KEY idx_jobs_category (category),
  KEY idx_jobs_type (type),
  KEY idx_jobs_published_at (published_at),
  KEY idx_jobs_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- blogs: insights/articles with publish workflow
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blogs (
  id           INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  title        VARCHAR(255)  NOT NULL,
  slug         VARCHAR(255)  NOT NULL,
  category     ENUM('Consulting', 'Staffing', 'Technology', 'Insights') NOT NULL,
  author       VARCHAR(255)  NOT NULL,
  read_time    VARCHAR(50)   NOT NULL,
  summary      TEXT          NOT NULL,
  content      LONGTEXT      NOT NULL,
  image        VARCHAR(500)  NULL DEFAULT NULL,
  status       ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  published_at TIMESTAMP     NULL DEFAULT NULL,
  created_at   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_blogs_slug (slug),
  KEY idx_blogs_status (status),
  KEY idx_blogs_category (category),
  KEY idx_blogs_published_at (published_at),
  KEY idx_blogs_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- job_applications: talent intake / apply now submissions
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS job_applications (
  id                   INT UNSIGNED      NOT NULL AUTO_INCREMENT,
  job_id               INT UNSIGNED      NULL DEFAULT NULL,
  applying_for         VARCHAR(255)      NOT NULL,
  application_type     ENUM('job', 'general') NOT NULL DEFAULT 'general',
  full_name            VARCHAR(255)      NOT NULL,
  email                VARCHAR(255)      NOT NULL,
  phone                VARCHAR(50)       NOT NULL,
  address              VARCHAR(500)      NOT NULL,
  qualification        VARCHAR(100)      NOT NULL,
  experience           VARCHAR(100)      NOT NULL,
  skills               TEXT              NOT NULL,
  pan_number           VARCHAR(10)       NOT NULL,
  notice_period        VARCHAR(100)      NULL DEFAULT NULL,
  linkedin             VARCHAR(500)      NULL DEFAULT NULL,
  resume_path          VARCHAR(500)      NOT NULL,
  resume_original_name VARCHAR(255)      NOT NULL,
  status               ENUM('new', 'reviewed', 'shortlisted', 'rejected') NOT NULL DEFAULT 'new',
  created_at           TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at           TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_job_applications_job_id (job_id),
  KEY idx_job_applications_status (status),
  KEY idx_job_applications_type (application_type),
  KEY idx_job_applications_created_at (created_at),
  CONSTRAINT fk_job_applications_job
    FOREIGN KEY (job_id) REFERENCES jobs (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- contact_inquiries: employer / corporate intake form
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id               INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  company_name     VARCHAR(255)  NOT NULL,
  contact_person   VARCHAR(255)  NOT NULL,
  phone            VARCHAR(50)   NOT NULL,
  email            VARCHAR(255)  NOT NULL,
  industry         VARCHAR(255)  NOT NULL,
  num_employees    VARCHAR(50)   NOT NULL,
  job_description  TEXT          NOT NULL,
  location         VARCHAR(255)  NOT NULL,
  status           ENUM('new', 'reviewed', 'contacted', 'closed') NOT NULL DEFAULT 'new',
  created_at       TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_contact_inquiries_status (status),
  KEY idx_contact_inquiries_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
