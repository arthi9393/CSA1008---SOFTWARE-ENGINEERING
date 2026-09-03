# 🏛️ CivicPulse: AI-Powered Citizen Grievance & Geospatial Management System

> **A closed-loop, automated civic governance platform integrating real-time citizen intake, Computer Vision triage, 50-meter spatial deduplication, and geo-fenced resolution verification for Municipal Corporations.**

---

## 🌟 Key Features & Innovations

* **📱 Public Citizen Portal:** 1-click GPS auto-detection (Browser Geolocation API), live camera capture, category selection (*Pothole, Streetlight, Garbage, Water Leak*), and real-time status tracking.
* **🧠 Automated AI Defect Triage:** Computer Vision pipeline that scores defect severity ($1\text{--}5$), calculates confidence levels ($>94\%$), and auto-assigns SLA targets ($12\text{h}/24\text{h}/48\text{h}$).
* **📍 50-Meter Spatial Deduplication Engine:** Uses the **Haversine Distance Formula** to detect complaints filed within a $50\text{m}$ radius of existing tickets, automatically merging duplicates into a **Master Ticket** to prevent wasted municipal trips.
* **🗺️ 200-Ward Interactive GIS Map:** OpenStreetMap & Leaflet.js dashboard mapping incidents across Greater Chennai Corporation (GCC) wards with color-coded urgency markers.
* **🔒 Anti-Ghost Closure Verification:** Field engineers must upload a geo-tagged "After" photo within $15\text{m}$ of original GPS coordinates before a ticket can be closed.
* **⭐ Civic Karma System:** Citizens earn reputation points upon verifying resolutions, boosting community engagement.

---

## 🏗️ System Architecture

```
                       +---------------------------------------------+
                       |              CITIZEN ACCESS LAYER           |
                       |       Web Portal (Phone/Laptop Browser)     |
                       +----------------------+----------------------+
                                              |
                                              v (REST API / JSON)
                       +---------------------------------------------+
                       |          FASTAPI PYTHON BACKEND ENGINE      |
                       |  - Ticket Lifecycle Management              |
                       |  - Haversine 50m Spatial Deduplication      |
                       |  - AI Defect Scoring & SLA Calculator       |
                       +----------------------+----------------------+
                                              |
                     +------------------------+------------------------+
                     |                                                 |
                     v                                                 v
+------------------------------------+               +------------------------------------+
|       DATA & STORAGE LAYER         |               |     MUNICIPAL COMMAND CENTER       |
|  - SQLite / PostgreSQL Persistence |               |  - Leaflet.js Interactive GIS Map  |
|  - GeoJSON Ward Boundaries (200 W) |               |  - Live Real-Time Complaint Queue  |
+------------------------------------+               +------------------------------------+
```

---

## 🛠️ Tech Stack & Tooling

* **Frontend:** HTML5, Tailwind CSS, JavaScript (ES6+), FontAwesome Icons
* **Maps & GIS:** Leaflet.js, OpenStreetMap (100% Free Open-Source GIS)
* **Backend:** Python 3.14, FastAPI, Uvicorn, Pydantic, RESTful API Architecture
* **Database:** SQLite / PostgreSQL + PostGIS (Spatial Indexing)
* **Intelligence:** Computer Vision Triage Model, Haversine Spatial Geometry

---

## 👥 Project Team Roles & Contributions
### What each file does

| File | Purpose |
|---|---|
| `index.html` | CivicPulse main/home page |
| `citizen_portal.html` | Citizen complaint reporting and tracking |
| `officer_dashboard.html` | Municipal officer dashboard |
| `interactive_wireframe.html` | Interactive UI/wireframe demonstration |
| `server.py` | FastAPI backend and API endpoints |
| `civicpulse.db` | SQLite grievance database |
| `README.md` | Project documentation |
| `.gitignore` | Files excluded from Git tracking |


---

## 🚀 Quick Start & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/CivicPulse-Grievance-System.git
cd CivicPulse-Grievance-System
```

### 2. Install Dependencies
```bash
pip install fastapi uvicorn pydantic python-docx python-pptx
```

### 3. Run the Backend Server
```bash
python server.py
```
* The API will start at: `http://127.0.0.1:8000`

### 4. Open the Web Portals
* **Master Homepage:** Open `index.html` in any browser
* **Citizen Portal:** Open `citizen_portal.html`
* **Officer Command Center:** Open `officer_dashboard.html`

---

## 📄 Project Deliverables Included in this Repo

* `Citizen_Grievance_Redressal_System_Full_Report.docx` — Complete 12-Chapter Academic Report
* `CivicPulse_Capstone_Presentation.pptx` — 10-Slide Final Viva Presentation Deck
* `interactive_wireframe.html` — Clickable Figma-style interactive UI flow
* `citizen_portal.html` — Public citizen reporting portal
* `officer_dashboard.html` — Municipal officer GIS dashboard
* `server.py` — Python FastAPI backend with AI & spatial deduplication
* `civicpulse.db` — Database with seeded Chennai grievances

---

## 📜 License
This project is licensed under the MIT License. Developed for Academic Capstone & Municipal Innovation.
