# Workshop Task: Automated Candidate Screening & Interview Prep

## 🎯 Objective
Automate the initial stages of the recruitment process: screening candidates against a job description, creating a comparison matrix, and generating personalized interview questions.

## 🛠️ Task Scenario
You are an HR Associate at Thinkware. You have received a batch of resumes (provided in CSV format) and a Job Description. Your goal is to identify the best-fit candidates quickly and prepare for the interview stage.

## 📝 Requirements

### 1. Candidate Screening & Scoring
Using the provided `job_description.txt`, analyze the `candidates_data.csv` and create a **Candidate Matching Report**.
*   **Scoring Criteria:** Assign a score (0-10) for each candidate based on:
    *   **Core Tech Match:** (Java, Spring, SQL, React/Vue)
    *   **Experience Level:** (Years of experience relative to the "Senior" requirement)
    *   **Cloud/DevOps Exposure:** (AWS, Docker, Kubernetes, etc.)
*   **Output:** A table showing: Name, Total Score, Top 3 Matching Skills, and "Match Fit" (High/Medium/Low).

### 2. Interview Preparation
For the **Top 2 matching candidates**, generate a customized **Interview Question Set**.
*   The questions should be specific to their actual experience listed in the data.
*   Include one "Behavioral" question and two "Technical" questions per candidate.
*   Example: If a candidate has strong Java experience, ask a question about Spring Boot microservices.

### 3. Communication Draft
Draft a professional **Interview Invitation Email** for the #1 ranked candidate.
*   The email must mention the specific role (Senior Fullstack Developer) and acknowledge their relevant experience (e.g., "Your experience with [Skill] caught our eye").
*   Tone: Professional, welcoming, and clear about the next steps.

## 📂 Files Provided
- `candidates_data.csv`: List of applicants with their key skills and experience.
- `job_description.txt`: The requirements for the Senior Fullstack Developer role.

## 🚀 Workflow (How to use Claude)
1.  **Step 1 (Read & Understand):** "Read the `job_description.txt` and `candidates_data.csv` files. Summarize the key requirements of the role."
2.  **Step 2 (Analysis):** "Compare the candidates in `candidates_data.csv` against the job requirements. Create a comparison table with a score out of 10 for each candidate."
3.  **Step 3 (Generation):** "Based on the top 2 candidates, generate a set of 3 tailored interview questions for each."
4.  **Step 4 (Communication):** "Write a professional interview invitation email for the top candidate."
