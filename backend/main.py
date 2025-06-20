from transformers import pipeline
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import time
import requests


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
    
    latencies = []
    successful = num_requests  # All simulated requests succeed
    failed = 0
    
    print(f"Starting API latency test simulation with {num_requests} requests...")
    start_time = time.time()
    
    for i in range(num_requests):
        request_start = time.time()

        result = await classify({"text": "Hello World"})
        print(result)
        
        request_time = (time.time() - request_start) * 1000  # Convert to ms
        latencies.append(request_time)
    
    total_time = time.time() - start_time
    
    # Calculate basic stats
    if latencies:
        avg_latency = sum(latencies) / len(latencies)
        min_latency = min(latencies)
        max_latency = max(latencies)
    else:
        avg_latency = min_latency = max_latency = 0
    
    result = {
        "total_requests": num_requests,
        "successful": successful,
        "failed": failed,
        "success_rate_percent": round((successful / num_requests) * 100, 1) if num_requests > 0 else 0,
        "total_time_seconds": round(total_time, 2),
        "requests_per_second": round(num_requests / total_time, 2) if total_time > 0 else 0,
        "avg_latency_ms": round(avg_latency, 2),
        "min_latency_ms": round(min_latency, 2),
        "max_latency_ms": round(max_latency, 2),
    }
    return result

def main():
    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    main()
