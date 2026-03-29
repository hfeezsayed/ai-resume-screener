import pdfplumber  # Imports the pdfplumber library for PDF manipulation.


def extract_text_from_pdf(
    file,
):  # Defines a function named 'extract_text_from_pdf' that takes a 'file' object as input.
    text = ""  # Initializes an empty string variable to hold all extracted text.

    with pdfplumber.open(
        file
    ) as pdf:  # Opens the provided 'file' object (which should be a file-like object representing a PDF) using pdfplumber.
        for page in pdf.pages:  # Loops through each page in the opened PDF document.
            text += (
                page.extract_text() or ""
            )  # Extracts text from the current page and appends it to 'text'; if no text, appends an empty string.

    return text  # Returns the complete extracted text from all pages of the PDF.
