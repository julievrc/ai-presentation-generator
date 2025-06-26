# SlideSynth Backend

A lightweight FastAPI backend that converts voice notes or text memos into structured 10-slide investor pitch decks.

## Quick Start

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your OpenAI API key
```

3. Run the server:
```bash
python main.py
```

## API Endpoints

### POST /generate-slides
Generate slide JSON from text or audio input.

**Parameters:**
- `text_content` (form): Text input (optional)
- `audio_file` (file): Audio file upload (optional)

**Response:**
```json
{
  "slides": [
    {
      "title": "Problem Statement",
      "bullets": ["Point 1", "Point 2", "Point 3"]
    }
  ],
  "slide_count": 10,
  "source_content": "Input content preview..."
}
```

### POST /generate-pptx
Generate and download a PowerPoint file.

**Parameters:**
- `text_content` (form): Text input (optional)
- `audio_file` (file): Audio file upload (optional)
- `filename` (form): Output filename (default: "slidesynth_presentation.pptx")

**Response:** PPTX file download

### POST /transcribe
Transcribe audio to text only.

**Parameters:**
- `file` (file): Audio file upload

**Response:**
```json
{
  "transcription": "Transcribed text content..."
}
```

## Example Usage

```bash
# Text input
curl -X POST "http://localhost:8000/generate-slides" \
  -F "text_content=My startup idea is..."

# Audio input
curl -X POST "http://localhost:8000/generate-slides" \
  -F "audio_file=@voice_memo.wav"

# Generate PPTX
curl -X POST "http://localhost:8000/generate-pptx" \
  -F "text_content=My startup idea is..." \
  -F "filename=my_pitch.pptx" \
  --output presentation.pptx
```