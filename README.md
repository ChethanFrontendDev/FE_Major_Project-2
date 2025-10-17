# Anvaya CRM

A full-stack **Customer Relationship Management (CRM)** app for managing leads and sales agents.  
Users can **search, add, edit, and delete leads and agents**, as well as view performance reports — all in one place.

Built with **React**, **Node.js**, **Express**, and **MongoDB**.

---

## Demo Link

[Live Demo](https://fe-major-project-2.vercel.app/)

---

## Quick Start

```
# Clone the repo
git clone https://github.com/ChethanFrontendDev/FE_Major_Project-2.git

# Go to the project folder
cd <your-repo>

# Install dependencies
npm install

# Start development server
npm run dev  # or `npm start` / `yarn dev`

```

---

## Technologies

- React JS
- React Router
- Node JS
- Express
- MongoDB

---

## Demo Video

Watch a walkthrough (4-5 minutes) of all the major features of this app:
[Loom Video](https://drive.google.com/file/d/1iCxBhtq0YNcthXIcKQ5WHYpfcSYWyYlr/view?usp=sharing)

---

## Features

**Home**

- View and search all leads
- View leads statuses with their counts.
- Filter by status or sales agent.
- Sort by priority or time to close.
- Add new leads quickly.

**Lead Details**

- View detailed lead info: name, status, source, agent, priority, etc.
- Edit and update leads.
- Add and view comments from sales agents.

**Agents**

- View all agents.
- Add new agents easily.

**Reports**

- Closed leads by agent.
- Lead status distribution.
- Leads closed and in pipeline (last 7 days)

**Settings**

- Delete leads and agents from the database.

---

## API Reference

### **GET /api/leads**<br>

List all leads<br>

Sample Response:<br>

```
[{name, status, source, salesAgent, priority}, ....]
```

### **GET /api/agents**<br>

List all agents<br>

Sample Response:<br>

```
[{name, email}]
```

### **GET /api/:id/comments**<br>

Get comments for a specific lead<br>

Sample Response:<br>

```
[{comment}]
```

### **GET /api/report/last-week**<br>

List closed leads in last week

Sample Response:<br>

```
[{name, status, source, salesAgent, closedAt}, ....]
```

### **GET /api/report/pipeline**<br>

View total number of leads in the pipeline<br>

Sample Response:<br>

```
{totalLeadsInPipeline}
```

### **POST /api/leads**<br>

Create a new lead:<br>

Sample Response:<br>

```
{name, status, source, salesAgent, priority, ....}
```

### **POST /api/agents**<br>

Create a new agent:<br>

Sample Response:<br>

```
{name, email}
```

### **PUT /api/leads/:id**<br>

Update an existing lead:<br>

Sample Response:<br>

```
{name, status, source, salesAgent, priority, ....}
```

### **DELETE /api/leads/:id**<br>

delete one lead:<br>

Sample Response:<br>

```
{message: "Lead Deleted Successfully"}
```

### **DELETE /api/agents/:id**<br>

delete one agent:<br>

Sample Response:<br>

```
{message: "Agent Deleted Successfully"}
```

## Contact

For bugs or feature request, please reach out to chethankumar.dev@gmail.com
