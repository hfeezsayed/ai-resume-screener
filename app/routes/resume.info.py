from fastapi import (
    APIRouter,
    UploadFile,
    File,
)  # Imports necessary FastAPI components for routing, file uploads, and defining file parameters.
from app.services.pdf_service import (
    extract_text_from_pdf,
)  # Imports the 'extract_text_from_pdf' function from your 'pdf_service.py' file.
from app.services.ai_service import analyze_resume

router = (
    APIRouter()
)  # Creates an instance of APIRouter to define and group related API endpoints.


@router.post(
    "/upload-resume"
)  # Decorator that registers the following function as an HTTP POST endpoint at the "/upload-resume" path.
async def upload_resume(
    file: UploadFile = File(...),
):  # Defines an asynchronous function 'upload_resume' that handles file uploads. It expects a file named 'file' of type UploadFile.

    text = extract_text_from_pdf(
        file.file
    )  # Calls your 'extract_text_from_pdf' function, passing the actual file content (file.file) from the uploaded file, and stores the returned text.

    return {
        "filename": file.filename,
        "text_preview": text[:500],
    }  # Returns a JSON response containing the original filename and the first 500 characters of the extracted text as a preview.


@router.post("/analyze")
async def analyze(file: UploadFile = File(...), job_description: str = Form(...)):

    resume_text = extract_text_from_pdf(file.file)

    ai_result = analyze_resume(resume_text, job_description)

    return {"analysis": ai_result}
