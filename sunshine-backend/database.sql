-- ============================================
-- Sunshine Academy - Database Setup
-- HOW TO USE:
-- 1. Open phpMyAdmin (http://localhost/phpmyadmin)
-- 2. Click "New" -> name: sunshine_academy -> Create
-- 3. Click "Import" -> choose this file -> Go
-- ============================================

CREATE DATABASE IF NOT EXISTS sunshine_academy
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE sunshine_academy;

-- ── Inquiries Table ──────────────────────────
CREATE TABLE IF NOT EXISTS inquiries (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(120)  NOT NULL,
  phone       VARCHAR(20)   NOT NULL,
  grade       VARCHAR(60)   DEFAULT '',
  type        VARCHAR(80)   DEFAULT '',
  message     TEXT          DEFAULT '',
  status      ENUM('new','contacted','enrolled','closed') DEFAULT 'new',
  ip_address  VARCHAR(45)   DEFAULT '',
  created_at  DATETIME      DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Admin Users Table ────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(60)  NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name     VARCHAR(120) DEFAULT '',
  last_login    DATETIME     DEFAULT NULL,
  created_at    DATETIME     DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Default Admin Account ────────────────────
-- Username : admin
-- Password : Sunshine@2025
-- ⚠️ CHANGE PASSWORD AFTER FIRST LOGIN via Register page!
INSERT IGNORE INTO admin_users (username, password_hash, full_name) VALUES (
  'admin',
  '$2y$12$EtZD1FQF3Bec47xkCyTJEuYNGdSMdUeFO6/5FeoH8DWX5XPQrU6B6',
  'Super Admin'
);

-- ── Sample Inquiries ─────────────────────────
INSERT IGNORE INTO inquiries (id, name, phone, grade, type, message, status) VALUES
  (1, 'Muhammad Ali',   '03001234567', 'Matric',    'Academic Tuition', 'Mujhe maths mein help chahiye',       'new'),
  (2, 'Fatima Zahra',  '03119876543', 'FSc Part 1', 'Exam Preparation', 'Physics aur chemistry ki tayari',     'contacted'),
  (3, 'Ahmed Raza',    '03331112233', 'Grade 7',    'Mathematics',      'Algebra weak hai mere bete ki',       'enrolled');
