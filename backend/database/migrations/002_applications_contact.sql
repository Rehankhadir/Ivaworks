-- Run after schema.sql: import in phpMyAdmin or mysql CLI
USE ivaworks;

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
