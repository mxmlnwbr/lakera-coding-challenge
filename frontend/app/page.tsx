"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, Zap, AlertTriangle, CheckCircle } from "lucide-react"

interface ClassificationResult {
  label: string
  score: number
}

export default function Component() {
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<ClassificationResult[]>([])
  const [hasResults, setHasResults] = useState(false)

  const handleClassify = async () => {
    if (!inputText.trim()) return

    setIsLoading(true)

    // call API endpoint http://127.0.0.1:8000
    const response = await fetch("http://127.0.0.1:8000/classify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputText }),
    })

    const data = await response.json()
    console.log(data)

    // Simulate API call with mock data
    setTimeout(() => {
      const mockResults: ClassificationResult[] = data

      setResults(mockResults)
      setHasResults(true)
      setIsLoading(false)
    }, 2000)
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "safe":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "moderate":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "high":
        return <Shield className="w-4 h-4 text-red-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "safe":
        return "bg-green-100 text-green-800 border-green-200"
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-green-100 text-green-800 border-green-200"
    }
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
          This advanced AI model, powered by KoalaAI's Text Moderation system, provides real-time content analysis to help you understand and manage text safety. Simply input any text and receive detailed scores across multiple risk categories.
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
              {!hasResults && !isLoading && (
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

              {hasResults && (
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{result.label}</span>
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
