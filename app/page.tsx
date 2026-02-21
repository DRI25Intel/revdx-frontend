'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    currentARR: '',
    targetARR: '',
    salesTeamSize: '',
    averageDealSize: '',
    salesCycleLength: '',
    winRate: '',
    context: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const diagnosticData = {
        companyName: formData.companyName,
        industry: formData.industry,
        currentARR: parseFloat(formData.currentARR),
        targetARR: parseFloat(formData.targetARR),
        salesTeamSize: parseInt(formData.salesTeamSize),
        averageDealSize: parseFloat(formData.averageDealSize),
        salesCycleLength: parseInt(formData.salesCycleLength),
        winRate: parseFloat(formData.winRate),
        context: formData.context
      }

     const response = await fetch('https://revdx.vercel.app/api/diagnostic', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userQuery: formData.context,
    metrics: {
      companyName: formData.companyName,
      industry: formData.industry,
      currentARR: parseFloat(formData.currentARR),
      targetARR: parseFloat(formData.targetARR),
      salesTeamSize: parseInt(formData.salesTeamSize),
      averageDealSize: parseFloat(formData.averageDealSize),
      salesCycleLength: parseInt(formData.salesCycleLength),
      winRate: parseFloat(formData.winRate),
    }
  })
})

      if (!response.ok) {
        throw new Error('Diagnostic failed')
      }

      const result = await response.json()
      
      sessionStorage.setItem('diagnosticResult', JSON.stringify(result))
      router.push('/results')
      
    } catch (err) {
      setError('Failed to generate diagnostic. Please try again.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-white">RevDX</h1>
          <p className="text-slate-400 text-sm mt-1">Revenue Diagnostic Engine</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Growth Constraint in 60 Seconds
          </h2>
          <p className="text-xl text-slate-300 mb-2">
            AI-powered revenue diagnostics for B2B companies scaling from $5M to $100M+
          </p>
          <p className="text-slate-400">
            Get an actionable 30-day operator plan based on 30+ years of enterprise sales expertise
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Get Your Free Diagnostic</h3>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Acme Corp"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Industry
              </label>
              <input
                type="text"
                name="industry"
                required
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="B2B SaaS, Manufacturing Tech, etc."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Current ARR ($)
                </label>
                <input
                  type="number"
                  name="currentARR"
                  required
                  value={formData.currentARR}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="8000000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Target ARR ($)
                </label>
                <input
                  type="number"
                  name="targetARR"
                  required
                  value={formData.targetARR}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="15000000"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Sales Team Size (# of AEs)
                </label>
                <input
                  type="number"
                  name="salesTeamSize"
                  required
                  value={formData.salesTeamSize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Average Deal Size ($)
                </label>
                <input
                  type="number"
                  name="averageDealSize"
                  required
                  value={formData.averageDealSize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="45000"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Sales Cycle (days)
                </label>
                <input
                  type="number"
                  name="salesCycleLength"
                  required
                  value={formData.salesCycleLength}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="120"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Win Rate (%)
                </label>
                <input
                  type="number"
                  name="winRate"
                  required
                  step="0.1"
                  value={formData.winRate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="22"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                What's the problem? (Be specific)
              </label>
              <textarea
                name="context"
                required
                value={formData.context}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="We've been stuck at $8M ARR for 9 months. Forecast accuracy is ±30%. Reps blame the market..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
            >
              {isSubmitting ? 'Generating Diagnostic...' : 'Get My Free Diagnostic'}
            </button>
          </form>

          <p className="text-slate-500 text-sm text-center mt-6">
            No credit card required. Takes 60 seconds.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-slate-400 text-sm">
            Built on 30+ years of enterprise sales experience • Powered by AI • Used by B2B companies scaling to $100M+
          </p>
        </div>
      </div>
    </div>
  )
}
