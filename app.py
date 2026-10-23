import os
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "dev-secret-key-change-in-production")

# ─── Portfolio Data ────────────────────────────────────────────────────────────

skills = [
    {"name": "Python",          "icon": "fab fa-python",        "percent": 92, "color": "#3b82f6"},
    {"name": "HTML5",           "icon": "fab fa-html5",         "percent": 95, "color": "#f97316"},
    {"name": "CSS3",            "icon": "fab fa-css3-alt",      "percent": 90, "color": "#06b6d4"},
    {"name": "JavaScript",      "icon": "fab fa-js",            "percent": 80, "color": "#eab308"},
    {"name": "Flask",           "icon": "fas fa-flask",         "percent": 85, "color": "#7c3aed"},
    {"name": "Git",             "icon": "fab fa-git-alt",       "percent": 88, "color": "#f97316"},
    {"name": "GitHub",          "icon": "fab fa-github",        "percent": 87, "color": "#a0a0b0"},
    {"name": "SQL",             "icon": "fas fa-database",      "percent": 75, "color": "#06b6d4"},
    {"name": "REST APIs",       "icon": "fas fa-network-wired", "percent": 82, "color": "#3b82f6"},
    {"name": "Linux",           "icon": "fab fa-linux",         "percent": 70, "color": "#eab308"},
    {"name": "Bootstrap",       "icon": "fab fa-bootstrap",     "percent": 85, "color": "#7c3aed"},
    {"name": "Problem Solving", "icon": "fas fa-brain",         "percent": 90, "color": "#ec4899"},
]

projects = [
    {
        "title": "E-Commerce Platform",
        "description": "A full-stack e-commerce web application with user authentication, product management, shopping cart, and payment integration. Features include real-time inventory updates and order tracking.",
        "image": "/static/images/project1.jpg",
        "tech": ["Python", "Flask", "SQLite", "Bootstrap", "JavaScript"],
        "category": "web",
        "live_url": "#",
        "github_url": "https://github.com/alexmorgan",
    },
    {
        "title": "Data Analysis Dashboard",
        "description": "Interactive data visualization dashboard built with Python, featuring real-time charts, advanced filtering, CSV import/export, and insightful summary statistics.",
        "image": "/static/images/project2.jpg",
        "tech": ["Python", "Pandas", "Flask", "Chart.js", "CSS"],
        "category": "python",
        "live_url": "#",
        "github_url": "https://github.com/alexmorgan",
    },
    {
        "title": "Portfolio Website",
        "description": "A responsive personal portfolio website showcasing projects and skills, built with Flask and modern CSS. Features smooth animations and a premium dark theme.",
        "image": "/static/images/project3.jpg",
        "tech": ["Flask", "HTML", "CSS", "JavaScript", "Jinja2"],
        "category": "web",
        "live_url": "#",
        "github_url": "https://github.com/alexmorgan",
    },
    {
        "title": "Task Manager API",
        "description": "A RESTful API for task management with full CRUD operations, JWT authentication, priority-based filtering, and comprehensive API documentation.",
        "image": "/static/images/project4.jpg",
        "tech": ["Python", "Flask", "REST API", "JSON", "Git"],
        "category": "python",
        "live_url": "#",
        "github_url": "https://github.com/alexmorgan",
    },
]

education = [
    {
        "degree": "Bachelor of Science in Computer Science",
        "institution": "Tech University",
        "year": "2020 – 2024",
        "description": "Focused on software engineering, algorithms, data structures, and web development. Completed multiple real-world projects and internships.",
        "achievements": ["First Class Honours", "Dean's List", "Best Final Year Project"],
    },
    {
        "degree": "Higher Secondary Certificate (HSC)",
        "institution": "City Science College",
        "year": "2018 – 2020",
        "description": "Studied Science with a focus on Mathematics and Computer Science. Achieved excellent results in board examinations.",
        "achievements": ["GPA 5.00/5.00", "Science Olympiad Finalist", "Programming Club President"],
    },
]

# ─── Routes ───────────────────────────────────────────────────────────────────

@app.route("/")
def index():
    return render_template(
        "index.html",
        skills=skills,
        projects=projects,
        education=education,
        enumerate=enumerate,
    )


@app.route("/send-message", methods=["POST"])
def send_message():
    try:
        data = request.get_json()
        name    = data.get("name", "").strip()
        email   = data.get("email", "").strip()
        subject = data.get("subject", "").strip()
        message = data.get("message", "").strip()

        if not all([name, email, subject, message]):
            return jsonify({"success": False, "message": "All fields are required."}), 400

        if "@" not in email or "." not in email:
            return jsonify({"success": False, "message": "Please enter a valid email address."}), 400

        # In production, integrate an email service (e.g. SendGrid, Mailgun) here.
        print(f"[Contact Form] From: {name} <{email}> | Subject: {subject}\n{message}")

        return jsonify({"success": True, "message": f"Thanks {name}! Your message has been received. I'll get back to you soon."})

    except Exception as e:
        return jsonify({"success": False, "message": "Something went wrong. Please try again later."}), 500


# ─── Entry Point ──────────────────────────────────────────────────────────────

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
