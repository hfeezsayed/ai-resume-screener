from fastapi import APIRouter, UploadFile, File, Form
from app.services.pdf_service import extract_text_from_pdf
from app.services.ai_service import analyze_resume
import json

router = APIRouter()


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    text = extract_text_from_pdf(file.file)

    return {"filename": file.filename, "text_preview": text[:500]}


@router.post("/analyze")
async def analyze(file: UploadFile = File(...), job_description: str = Form(...)):

    resume_text = extract_text_from_pdf(file.file)

    ai_result = analyze_resume(resume_text, job_description)

    try:
        # Remove markdown if present
        ai_result = ai_result.replace("```json", "").replace("```", "").strip()

        # Convert string to JSON
        ai_result = json.loads(ai_result)
    except Exception as e:
        return {"error": "Failed to parse AI response", "raw_output": ai_result}

    return {"analysis": ai_result}
