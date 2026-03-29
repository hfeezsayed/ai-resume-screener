import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def analyze_resume(resume_text, job_description):
    prompt = f"""
    You are an AI resume analyzer.

    Compare the resume with the job description.

    Resume:
    {resume_text}

    Job Description:
    {job_description}

    IMPORTANT:
    Return ONLY valid JSON (no explanation).

    Format:
    {{
        "score": number (0-100),
        "missing_skills": [list of skills],
        "suggestions": [list of improvements]
    }}
    """

    response = client.chat.completions.create(
        model="gpt-4.1-mini", messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content
