"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Shield, Zap } from "lucide-react"
import Link from "next/link"

interface ClassificationResult {
  label: string
  score: number
}

interface LoadTestResult {
  total_requests: number
  successful: number
  failed: number
  success_rate_percent: number
  total_time_seconds: number
  requests_per_second: number
  avg_latency_ms: number
  min_latency_ms: number
  max_latency_ms: number
  p95_latency_ms: number
}

// Mapping from label codes to full category names
const categoryMapping: Record<string, string> = {
  "S": "sexual",
  "H": "hate",
  "V": "violence",
  "HR": "harassment",
  "SH": "self-harm",
  "S3": "sexual/minors",
  "H2": "hate/threatening",
  "V2": "violence/graphic",
  "OK": "OK"
}

export default function Component() {
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<ClassificationResult[]>([])
  const [hasResults, setHasResults] = useState(false)
  const [loadTestResults, setLoadTestResults] = useState<LoadTestResult | null>(null)
  const [showLoadTest, setShowLoadTest] = useState(false)

  const handleClassify = async () => {
    if (!inputText.trim()) return

    setIsLoading(true)

    const response = await fetch("http://127.0.0.1:8000/classify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputText }),
    })

    const data = await response.json()
    console.log(data)

    setTimeout(() => {
      const results: ClassificationResult[] = data

      setResults(results)
      setHasResults(true)
      setIsLoading(false)
    }, 2000)
  }

  const handleLoadTest = async () => {
    setIsLoading(true)
    setLoadTestResults(null)

    const response = await fetch("http://127.0.0.1:8000/load-test", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    console.log(data)

    setLoadTestResults(data)
    setShowLoadTest(true)
    setHasResults(false)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8" />
              <span className="text-xl font-bold">LAKERA</span>
            </div>
            <div className="flex items-center space-x-4">
              
              
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Content <span className="text-blue-500">Classification</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          This advanced AI model, powered by <Link href="https://huggingface.co/KoalaAI/Text-Moderation" target="_blank" className="underline text-blue-500">KoalaAI</Link>'s Text Moderation system, provides real-time content analysis to help you understand and manage text safety. Simply input any text and receive detailed scores across multiple risk categories.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                Text Input
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter your text content here for classification analysis..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] resize-none"
              />
              <Button
                onClick={handleClassify}
                disabled={!inputText.trim() || isLoading}
                className="w-full bg-black hover:bg-gray-800"
              >
                {isLoading ? "Analyzing..." : "Classify Content"}
              </Button>
              <Button
                onClick={handleLoadTest}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 mt-2"
              >
                Test API Latency
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                Classification Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!hasResults && !showLoadTest && !isLoading && (
                <div className="text-center py-12 text-gray-500">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Enter text and click "Classify Content" to see results</p>
                </div>
              )}

              {isLoading && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Analyzing content...</p>
                </div>
              )}

              {hasResults && !showLoadTest && (
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{categoryMapping[result.label] || result.label} ({result.label})</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Confidence Score</span>
                          <span className="font-medium">{(result.score * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={result.score * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {showLoadTest && loadTestResults && (
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 space-y-3 bg-blue-50">
                    <h3 className="font-bold text-lg">API Latency Test Results</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div className="bg-white p-3 rounded shadow-sm">
                        <div className="text-sm text-gray-500">Requests</div>
                        <div className="font-medium">{loadTestResults.total_requests}</div>
                      </div>
                      
                      <div className="bg-white p-3 rounded shadow-sm">
                        <div className="text-sm text-gray-500">Success Rate</div>
                        <div className="font-medium">{loadTestResults.success_rate_percent}%</div>
                      </div>
                      
                      <div className="bg-white p-3 rounded shadow-sm">
                        <div className="text-sm text-gray-500">Avg Latency</div>
                        <div className="font-medium">{loadTestResults.avg_latency_ms.toFixed(2)} ms</div>
                      </div>
                      
                      <div className="bg-white p-3 rounded shadow-sm">
                        <div className="text-sm text-gray-500">Requests/sec</div>
                        <div className="font-medium">{loadTestResults.requests_per_second.toFixed(2)}</div>
                      </div>
                      
                      <div className="bg-white p-3 rounded shadow-sm">
                        <div className="text-sm text-gray-500">Min Latency</div>
                        <div className="font-medium">{loadTestResults.min_latency_ms.toFixed(2)} ms</div>
                      </div>
                      
                      <div className="bg-white p-3 rounded shadow-sm">
                        <div className="text-sm text-gray-500">Max Latency</div>
                        <div className="font-medium">{loadTestResults.max_latency_ms.toFixed(2)} ms</div>
                      </div>
                      
                      <div className="bg-white p-3 rounded shadow-sm col-span-2">
                        <div className="text-sm text-gray-500">95th Percentile Latency</div>
                        <div className="font-medium">{loadTestResults.p95_latency_ms.toFixed(2)} ms</div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <Button 
                        onClick={() => {
                          setShowLoadTest(false);
                          setLoadTestResults(null);
                        }}
                        variant="outline"
                        className="w-full"
                      >
                        Clear Results
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Trusted By Section */}
        <div className="mt-16 text-center">
          
          
        </div>
      </main>
    </div>
  )
}
