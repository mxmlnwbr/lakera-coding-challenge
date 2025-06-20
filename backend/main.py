from transformers import pipeline
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import time


app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def root():
    return {"message": "Hello World"}

# Add an endpoint for text classification
@app.post("/classify")
async def classify(text: dict):
    pipe = pipeline("text-classification", model="KoalaAI/Text-Moderation")
    result = pipe(text.get("text", ""), top_k=None)
    return result

@app.get("/load-test")
async def load_test():
    num_requests = 100  # Number of requests to simulate
    
    # 100 different short sentences for testing
    test_sentences = [
        "The sky is blue.",
        "I love to read books.",
        "She plays the piano beautifully.",
        "The coffee is too hot.",
        "They went to the beach yesterday.",
        "My dog likes to play fetch.",
        "The movie was really interesting.",
        "He runs every morning.",
        "The flowers smell wonderful.",
        "We should meet for lunch soon.",
        "The train arrives at 3 PM.",
        "This cake tastes delicious.",
        "I need to buy new shoes.",
        "She speaks three languages fluently.",
        "The museum closes at 5 PM.",
        "That book changed my life.",
        "The children are playing in the park.",
        "He forgot his keys at home.",
        "The concert was amazing.",
        "I prefer tea over coffee.",
        "The restaurant serves great food.",
        "She won the competition easily.",
        "The car needs to be repaired.",
        "We watched the sunset together.",
        "The meeting starts in ten minutes.",
        "I enjoy walking in the rain.",
        "The painting looks realistic.",
        "They built a new house.",
        "The cat sleeps all day.",
        "I finished my homework early.",
        "The river flows rapidly.",
        "She baked cookies for everyone.",
        "The phone battery is low.",
        "We visited the famous landmark.",
        "He teaches math at the university.",
        "The garden looks beautiful in spring.",
        "I missed the bus this morning.",
        "The package arrived yesterday.",
        "She writes poetry in her free time.",
        "The temperature dropped overnight.",
        "We need to leave soon.",
        "The baby is sleeping peacefully.",
        "He solved the puzzle quickly.",
        "The lights went out during the storm.",
        "I found my lost wallet.",
        "The team won the championship.",
        "She planted flowers in the garden.",
        "The water is too cold for swimming.",
        "We celebrated his birthday last week.",
        "He plays guitar in a band.",
        "The store opens at 9 AM.",
        "I learned a new recipe today.",
        "The birds sing in the morning.",
        "She designed her own website.",
        "The road is closed for construction.",
        "We adopted a puppy from the shelter.",
        "He collects vintage comic books.",
        "The snow is falling heavily.",
        "I finished reading the novel.",
        "The audience applauded loudly.",
        "She grows vegetables in her backyard.",
        "The internet connection is slow.",
        "We hiked up the mountain.",
        "He donated blood yesterday.",
        "The cake recipe requires three eggs.",
        "I met an old friend today.",
        "The leaves change color in autumn.",
        "She fixed the broken chair.",
        "The bus was late this morning.",
        "We watched a documentary last night.",
        "He wrote a letter to his grandmother.",
        "The window is open.",
        "I bought fresh fruits from the market.",
        "The stars shine brightly tonight.",
        "She sold her old bicycle.",
        "The printer ran out of ink.",
        "We ordered pizza for dinner.",
        "He wakes up early every day.",
        "The floor needs to be cleaned.",
        "I learned to swim last summer.",
        "The clock stopped working.",
        "She drives to work every day.",
        "The library has many books.",
        "We planned a surprise party.",
        "He speaks softly but clearly.",
        "The door is locked.",
        "I watered the plants this morning.",
        "The moon is full tonight.",
        "She answered all questions correctly.",
        "The soup tastes too salty.",
        "We booked tickets for the concert.",
        "He fixed the leaking faucet.",
        "The traffic is heavy today.",
        "I need to charge my phone.",
        "The wind blows strongly.",
        "She decorated the room beautifully.",
        "The milk expired yesterday.",
        "We should recycle more.",
        "He painted the wall blue.",
        "I hate everyone!"
    ]
    print(f"Number of test sentences: {len(test_sentences)}")
    
    latencies = []
    successful = 0
    failed = 0
    
    print(f"Starting API latency test with {num_requests} requests...")
    start_time = time.time()
    
    for i in range(num_requests):
        request_start = time.time()

        try:
            # Use a different sentence for each request
            await classify({"text": test_sentences[i]})
        except Exception as e:
            failed += 1
            continue
        
        request_time = (time.time() - request_start) * 1000  # Convert to ms
        latencies.append(request_time)
        successful += 1
    
    total_time = time.time() - start_time
    
    # Calculate basic stats
    avg_latency = sum(latencies) / len(latencies)
    min_latency = min(latencies)
    max_latency = max(latencies)
    
    result = {
        "total_requests": num_requests,
        "successful": successful,
        "failed": failed,
        "success_rate_percent": round((successful / num_requests) * 100, 1) if num_requests > 0 else 0,
        "failed_rate_percent": round((failed / num_requests) * 100, 1) if num_requests > 0 else 0,
        "total_time_seconds": round(total_time, 2),
        "requests_per_second": round(successful / total_time, 2) if total_time > 0 else 0,
        "avg_latency_ms": round(avg_latency, 2),
        "min_latency_ms": round(min_latency, 2),
        "max_latency_ms": round(max_latency, 2),
    }
    return result

def main():
    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    main()
