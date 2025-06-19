from transformers import pipeline
from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
def root():
    pipe = pipeline("text-classification", model="KoalaAI/Text-Moderation")
    result = pipe("I love you!", top_k=None)
    return result


def main():
    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    main()
