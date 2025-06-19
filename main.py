# Use a pipeline as a high-level helper
from transformers import pipeline

def main():
    pipe = pipeline("text-classification", model="KoalaAI/Text-Moderation")

    result = pipe("I love you!")
    print(result)

if __name__ == "__main__":
    main()
