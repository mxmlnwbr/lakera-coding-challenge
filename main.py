# Use a pipeline as a high-level helper
from transformers import pipeline

def main():
    pipe = pipeline("text-classification", model="KoalaAI/Text-Moderation")

    result = pipe("I love you!", top_k=None)
    
    # print result with score
    for prediction in result:
        print(f"{prediction['label']}: {prediction['score']}")


if __name__ == "__main__":
    main()
