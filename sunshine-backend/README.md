# ☀️ Sunshine Academy — PHP Backend

---

## 📁 Folder Structure

```
sunshine-backend/
├── config/
│   ├── db.php        ← Database connection + helpers
│   └── auth.php      ← Admin login/session handler
├── api/
│   └── inquiry.php   ← Form submission API (React calls this)
├── admin/
│   ├── index.php     ← Admin Login page
│   ├── dashboard.php ← Inquiry management panel
│   └── logout.php    ← Session logout
├── public/
│   └── (copy logo.png here)
└── database.sql      ← Run this in phpMyAdmin FIRST
```

---

## 🚀 Local Setup (XAMPP)

### Step 1 — Install XAMPP
Download: https://www.apachefriends.org/

### Step 2 — Copy Backend Files
Copy `sunshine-backend` folder to:
```
C:\xampp\htdocs\sunshine-backend
```

### Step 3 — Create Database
1. Open XAMPP → Start **Apache** + **MySQL**
2. Go to: http://localhost/phpmyadmin
3. Click **"New"** → name it `sunshine_academy` → Create
4. Click **Import** → choose `database.sql` → Go

### Step 4 — Test API
Visit: http://localhost/sunshine-backend/admin/

**Login:**
- Username: `admin`
- Password: `Sunshine@2025`

---

## 🔗 Connect React Frontend

In `sunshine-academy/src/api.js`:
```js
// Local
export const API_BASE = 'http://localhost/sunshine-backend';

// Live server
export const API_BASE = 'https://yourdomain.com/sunshine-backend';
```

---

## 🌐 Live Server Setup (Hostinger/cPanel)

1. Upload `sunshine-backend` to `public_html/sunshine-backend`
2. Create MySQL database in cPanel
3. Import `database.sql`
4. Edit `config/db.php` with your live credentials:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'your_db_name');
define('DB_USER', 'your_db_user');
define('DB_PASS', 'your_db_password');
```
5. Update `src/api.js` in React with your live URL
6. Run `npm run build` and upload `dist` folder

---

## 🔐 Security Checklist (Before Going Live)

- [ ] Change admin password in phpMyAdmin
- [ ] Set `ALLOWED_ORIGIN` to your domain in `config/db.php`
- [ ] Enable HTTPS on your hosting
- [ ] Change `DB_USER` and `DB_PASS` from defaults

---

## 📞 Support
**Sunshine Academy** · 0300 9827982 · Shadab Colony, Faisalabad
