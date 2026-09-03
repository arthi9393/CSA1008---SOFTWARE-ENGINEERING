# 🏛️ CivicPulse — AI-Powered Citizen Grievance & Geospatial Management System

> **A web-based civic grievance platform that connects citizens and municipal officers through GPS-enabled complaint reporting, automated triage, spatial duplicate detection, SLA management, and complaint resolution tracking.**

---

## 📌 Project Overview

**CivicPulse** is a software engineering project designed to improve the way citizens report civic problems and how municipal authorities receive, manage, and resolve those complaints.

The platform provides two main interfaces:

### 📱 Citizen Portal

Citizens can:

- Report civic problems from a mobile phone or computer
- Upload photographic evidence
- Automatically detect their GPS location
- Select the type of civic issue
- Submit a grievance and receive a unique Ticket ID
- Track the status of their complaint
- Receive information about the assigned ward and SLA

### 🖥️ Municipal Officer Dashboard

Municipal officers can:

- View complaints stored in the database
- Inspect individual grievance records
- View category, severity, location, and description
- Identify duplicate complaints
- Monitor complaint status
- Verify resolution using an "After" photograph
- Mark complaints as resolved

---

# 🎯 Problem Statement

Citizens frequently encounter civic problems such as:

- 🕳️ Potholes
- 💡 Streetlight failures
- 🗑️ Waste accumulation
- 💧 Water leakage
- 🛣️ Road-related problems

Traditional complaint systems can make it difficult to accurately identify the location of a problem, prevent duplicate complaints, monitor service-level deadlines, and verify whether an issue has actually been resolved.

CivicPulse addresses these challenges through a centralized digital grievance management system.

---

# 💡 Proposed Solution

CivicPulse creates a complete digital workflow:

```text
Citizen
   │
   ▼
📱 Report Civic Issue
   │
   ├── 📷 Photo Evidence
   ├── 📍 GPS Location
   └── 🏷️ Issue Category
   │
   ▼
⚙️ FastAPI Backend
   │
   ├── AI Triage
   ├── Severity Calculation
   ├── SLA Assignment
   └── 50m Duplicate Detection
   │
   ▼
🗄️ SQLite Database
   │
   ▼
🖥️ Officer Dashboard
   │
   ├── Inspect Complaint
   ├── Assign / Process
   ├── Resolution Verification
   └── Mark Resolved
   │
   ▼
📱 Citizen Tracking
