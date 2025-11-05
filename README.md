# Placement Portal (MERN + Redux Toolkit)

A full-stack Placement Management System built using **MERN Stack**.  
It connects **Students (Applicants)** with **Recruiters** while providing a smooth hiring workflow.

---

## Features

### ✅ Student (Applicant)
- Secure Authentication (Signup / Login)
- Browse and view job listings
- Apply for jobs posted by recruiters
- Update personal profile:
  - Add / remove skills
  - Upload resume (Multer / Cloud storage supported)
  - Edit basic personal & professional details
- Track all applied job statuses (Pending / Accepted / Rejected)

---

### ✅ Recruiter
- Secure Authentication (Signup / Login)
- Create and manage companies
- Post jobs under respective companies
- View all applications for each job
- View applicant profile & resume
- **Accept / Reject applications**
- **Email notifications are automatically sent to applicants** when the recruiter updates status:
  - Accepted → Applicant receives Approval Email
  - Rejected → Applicant receives Rejection Email

---

## ✉️ Email Notification System (New Feature)
When a recruiter updates an application status:

- The **system sends an email** to the applicant
- The email includes:
  - Job title
  - Updated status (Accepted / Rejected)
- Email is sent using **Nodemailer**
- Sender identity supports:
  - Sender(Recruiter) email (recommended)
---

## 🏗 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React.js, Redux Toolkit, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ORM) |
| Authentication | JWT (JSON Web Tokens) |
| Global State | Redux Toolkit |
| File Upload | Multer / Cloud Storage (optional) |
| Email Service | Nodemailer + Gmail App Password |
| UI Components | ShadCN / Custom Tailwind Components |

---

