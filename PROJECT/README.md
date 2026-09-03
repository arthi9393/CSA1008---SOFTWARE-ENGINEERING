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
# ⭐ Key Features

- 📱 Citizen grievance reporting
- 📍 GPS-based location detection
- 🗺️ Greater Chennai Corporation ward identification
- 🧠 Automated complaint triage
- ⏱️ SLA-based prioritization
- 📍 50-meter duplicate complaint detection
- 🎫 Unique complaint Ticket ID
- 🔎 Complaint status tracking
- 🖥️ Municipal officer dashboard
- 📸 Resolution verification
- 🗄️ SQLite database
- 🔄 REST API using FastAPI
# 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS, JavaScript |
| UI | Tailwind CSS |
| Backend | Python FastAPI |
| Server | Uvicorn |
| Database | SQLite |
| GIS | GCC GIS / Leaflet |
| Location | Browser Geolocation API |
| API | REST / JSON |
# 🚀 How to Run

```cmd
cd /d "C:\Users\arthi\.gemini\antigravity\scratch\CivicPulse-Grievance-System"
py server.py
http://127.0.0.1:8000
http://127.0.0.1:8000/citizen_portal.html
http://127.0.0.1:8000/officer_dashboard.html

### One small thing to notice

Your local path is:

```text
C:\Users\arthi\.gemini\antigravity\scratch\CivicPulse-Grievance-System


#🔌 API Endpoints
Ward Detection
GET /api/ward?lat=<latitude>&lon=<longitude>
Dashboard KPI
GET /api/kpi
Get Grievances
GET /api/grievances
Create Grievance
POST /api/grievances
Resolve Grievance
PATCH /api/grievances/{ticket_no}/resolve


#🔄 Complaint Lifecycle
        📱 Citizen
            │
            ▼
        SUBMITTED
            │
            ▼
         ASSIGNED
            │
            ▼
       IN_PROGRESS
            │
            ▼
        RESOLVED ✅
##Duplicate Complaint
New Complaint
      │
      ▼
50m Distance Check
      │
      ├── No Duplicate ──► New Ticket
      │
      └── Duplicate ─────► MERGED
                              │
                              ▼
                       Master Ticket
#🧪 Example Test

A typical CivicPulse demonstration can follow this workflow:

1. Open Citizen Portal
        ↓
2. Select POTHOLE
        ↓
3. Allow GPS Location
        ↓
4. Enter Complaint Description
        ↓
5. Submit Complaint
        ↓
6. System Generates Ticket ID
        ↓
7. Complaint Saved to SQLite
        ↓
8. Open Officer Dashboard
        ↓
9. Inspect Complaint
        ↓
10. Process Complaint
        ↓
11. Submit Resolution Proof
        ↓
12. Mark Complaint as RESOLVED
        ↓
#13. Citizen Tracks Ticket
📍 GIS & Location Intelligence

CivicPulse uses browser-based GPS coordinates to identify the geographical location of a complaint.

For Greater Chennai Corporation locations, the system can identify the corresponding Zone and Ward.

Example:

GPS:
13.0418° N, 80.2341° E

Auto-Mapped Ward:
Zone 9, Ward 119 (T. Nagar)

For locations outside the configured GCC area:

Outside Greater Chennai Corporation

This ensures that non-Chennai locations are not incorrectly assigned to a Chennai ward.

#🧠 Intelligent Complaint Processing

The backend performs automated processing when a grievance is submitted.

Complaint
    │
    ▼
Category Analysis
    │
    ▼
Severity Assignment
    │
    ▼
SLA Calculation
    │
    ▼
50m Duplicate Check
    │
    ▼
Database Storage

Example SLA configuration:

Complaint	Severity	SLA
Pothole	HIGH	24 Hours
Water Leak	CRITICAL	12 Hours
Streetlight	MEDIUM	48 Hours
Waste	MEDIUM	24 Hours


#🎫 Ticket Management

Every unique complaint receives a Ticket ID.

Example:

CP-7615

The Ticket ID can be used by citizens to track their complaint.

Duplicate complaints are linked to an existing master ticket.

Example:

Master Ticket: CP-7615
Duplicate Ticket: CP-9067
Status: MERGED


#🚀 Future Enhancements
PostgreSQL + PostGIS production database
Full role-based officer authentication
Real-time notifications
Advanced computer vision model
Complete GCC 200-ward GIS visualization
Cloud database deployment
SMS / Email notifications
Advanced analytics
Automated officer assignment
Progressive Web App (PWA)
Production-grade security


#📜 License

MIT License

#🏛️ CivicPulse
Report. Track. Resolve.
📱 Citizen
     +
📍 GPS
     +
🧠 Intelligent Triage
     +
🗺️ GIS
     +
🖥️ Municipal Dashboard
     =
🏛️ CIVICPULSE
