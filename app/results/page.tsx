'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface DiagnosticResult {
  sessionId: string
  companyName: string
  analysis: string
  primaryConstraint: string
  realConstraint: string
  actionableInsights: string[]
  confidenceScore: number
  pillarsFired: number[]
  violationsDetected: string[]
  createdAt: string
}

export default function Results() {
  const router = useRouter()
  const [result, setResult] = useState<DiagnosticResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedResult = sessionStorage.getItem('diagnosticResult')
    if (storedResult) {
      setResult(JSON.parse(storedResult))
    } else {
      router.push('/')
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!result) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">RevDX</h1>
            <p className="text-slate-400 text-sm mt-1">Revenue Diagnostic Results</p>
          </div>
          <Link 
            href="/"
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            New Diagnostic
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{result.companyName}</h2>
          <p className="text-slate-400">Diagnostic completed on {new Date(result.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="mb-8 p-6 bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 mb-1">Analysis Confidence</p>
              <p className="text-3xl font-bold text-white">{Math.round(result.confidenceScore * 100)}%</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400 mb-1">Pillars Analyzed</p>
              <p className="text-2xl font-semibold text-blue-400">{result.pillarsFired.join(', ')}</p>
            </div>
          </div>
        </div>

        <div className="mb-8 p-6 bg-red-500/10 border border-red-500/50 rounded-lg">
          <h3 className="text-lg font-semibold text-red-400 mb-2">Primary Constraint Detected</h3>
          <p className="text-xl text-white font-medium">{result.primaryConstraint}</p>
        </div>

        <div className="mb-8 p-6 bg-orange-500/10 border border-orange-500/50 rounded-lg">
          <h3 className="text-lg font-semibold text-orange-400 mb-2">Root Cause</h3>
          <p className="text-xl text-white">{result.realConstraint}</p>
        </div>

        {result.violationsDetected && result.violationsDetected.length > 0 && (
          <div className="mb-8 p-6 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">Operating Non-Negotiables Violated</h3>
            <ul className="space-y-2">
              {result.violationsDetected.map((violation, idx) => (
                <li key={idx} className="text-white flex items-start">
                  <span className="text-yellow-400 mr-2">⚠</span>
                  {violation}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-8 p-6 bg-blue-500/10 border border-blue-500/50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Actionable Insights</h3>
          <ul className="space-y-3">
            {result.actionableInsights.map((insight, idx) => (
              <li key={idx} className="text-white flex items-start">
                <span className="text-blue-400 mr-2 font-bold">{idx + 1}.</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8 p-6 bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Complete Analysis</h3>
          <div className="prose prose-invert max-w-none">
            <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
              {result.analysis}
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibo
