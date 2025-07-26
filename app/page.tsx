'use client'

import { useState } from 'react'

export default function Home() {
  const [showContactModal, setShowContactModal] = useState(false)
  const [showWaitlistModal, setShowWaitlistModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{show: boolean, message: string, type: 'success' | 'error'}>({ show: false, message: '', type: 'success' })

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000)
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.target as HTMLFormElement)
    formData.append("access_key", "27762791-179e-4021-8319-f180f0ffae0e")
    formData.append("subject", "New Contact Form Submission - Echo Ridge")
    formData.append("from_name", "Echo Ridge Website")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setShowContactModal(false)
        showToast('Message sent successfully!', 'success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        console.log("Error", data)
        showToast('Failed to send message. Please try again.', 'error')
      }
    } catch (error) {
      console.log("Error", error)
      showToast('Failed to send message. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.target as HTMLFormElement)
    formData.append("access_key", "27762791-179e-4021-8319-f180f0ffae0e")
    formData.append("subject", "New Waitlist Signup - Echo Ridge")
    formData.append("from_name", "Echo Ridge Website")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setShowWaitlistModal(false)
        showToast('Successfully joined the waitlist!', 'success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        console.log("Error", data)
        showToast('Failed to join waitlist. Please try again.', 'error')
      }
    } catch (error) {
      console.log("Error", error)
      showToast('Failed to join waitlist. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-400">
      {/* Hero Section */}
      <section className="flex items-end justify-start min-h-screen px-6 pb-8 md:pb-4 relative parallax-bg" style={{backgroundImage: 'url(/echo-ridge-background.png)'}} >
        <div className="absolute inset-0 bg-gradient-to-t from-primary-500/60 via-primary-500/20 to-transparent"></div>
        <div className="text-left max-w-3xl relative z-10 w-full">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-primary-50 mb-4 tracking-tight drop-shadow-2xl fade-in-up font-serif">
            Project Echo Ridge
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 mb-6 fade-in-up animate-delay-200 w-full">
            <button 
              onClick={() => setShowContactModal(true)}
              className="px-6 py-3 bg-transparent text-primary-50 text-base font-medium backdrop-blur-sm border border-primary-100/20 sm:border-none rounded-lg sm:rounded-none hover:bg-primary-50/10 sm:hover:bg-transparent transition-all duration-200 w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Contact Us
            </button>
            <button 
              onClick={() => setShowWaitlistModal(true)}
              className="px-6 py-3 bg-transparent text-primary-50 text-base font-medium backdrop-blur-sm border border-primary-100/20 sm:border-none rounded-lg sm:rounded-none hover:bg-primary-50/10 sm:hover:bg-transparent transition-all duration-200 w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="min-h-screen flex items-center justify-center px-6 bg-primary-500 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-primary-50/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-secondary-200/15 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-radial from-primary-200/10 to-transparent rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-50 mb-6 relative">
              How It Works
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 sm:w-96 h-1 bg-gradient-to-r from-transparent via-secondary-200 to-transparent"></div>
            </h2>
            <p className="text-lg sm:text-xl text-primary-100 max-w-2xl mx-auto px-4">
              Advanced language model analysis combined with proprietary algorithms to calculate precise market fit for your AI products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-primary-50/10 p-6 sm:p-8 md:p-10 border border-primary-100/20 backdrop-blur-sm rounded-2xl fade-in-up animate-delay-100 relative group hover:bg-primary-50/15 transition-all duration-300">
              <div className="absolute top-4 right-4 w-2 h-2 bg-secondary-200 rounded-full opacity-60"></div>
              <div className="absolute top-6 right-6 w-1 h-1 bg-secondary-50 rounded-full opacity-40"></div>
              <h3 className="text-xl sm:text-2xl font-bold text-primary-50 mb-4">LLM-Powered Analysis</h3>
              <p className="text-primary-100 leading-relaxed text-sm sm:text-base">
                Harness the power of advanced language models to analyze market trends, competitor landscapes, and positioning opportunities with unprecedented depth.
              </p>
            </div>

            <div className="bg-primary-50/10 p-6 sm:p-8 md:p-10 border border-primary-100/20 backdrop-blur-sm rounded-2xl fade-in-up animate-delay-200 relative group hover:bg-primary-50/15 transition-all duration-300">
              <div className="absolute top-4 right-4 w-2 h-2 bg-secondary-200 rounded-full opacity-60"></div>
              <div className="absolute top-6 right-6 w-1 h-1 bg-secondary-50 rounded-full opacity-40"></div>
              <h3 className="text-xl sm:text-2xl font-bold text-primary-50 mb-4">Open Source</h3>
              <p className="text-primary-100 leading-relaxed text-sm sm:text-base">
                Built by the community, for the community. Transparent algorithms, collaborative development, and accessible to organizations of all sizes.
              </p>
            </div>

            <div className="bg-primary-50/10 p-6 sm:p-8 md:p-10 border border-primary-100/20 backdrop-blur-sm rounded-2xl fade-in-up animate-delay-300 relative group hover:bg-primary-50/15 transition-all duration-300">
              <div className="absolute top-4 right-4 w-2 h-2 bg-secondary-200 rounded-full opacity-60"></div>
              <div className="absolute top-6 right-6 w-1 h-1 bg-secondary-50 rounded-full opacity-40"></div>
              <h3 className="text-xl sm:text-2xl font-bold text-primary-50 mb-4">Custom Fit Algorithms</h3>
              <p className="text-primary-100 leading-relaxed text-sm sm:text-base">
                Proprietary matching algorithms that go beyond basic market research to provide precise fit calculations tailored to your specific AI product.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen flex items-center px-6 bg-gradient-to-br from-primary-400 to-primary-300">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-50 mb-6">
              About Project Echo Ridge
            </h2>
            <p className="text-lg sm:text-xl text-primary-100 px-4">
              Bridging the gap between AI innovation and market reality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary-50 mb-4">Our Mission</h3>
                <p className="text-base sm:text-lg text-primary-100 leading-relaxed">
                  To democratize access to sophisticated market intelligence, enabling both startups and enterprises to make data-driven positioning decisions for their AI products.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary-50 mb-4">How It Works</h3>
                <p className="text-base sm:text-lg text-primary-100 leading-relaxed">
                  Our platform combines advanced language model analysis with proprietary algorithms to evaluate market dynamics, competitive positioning, and product-market fit with unprecedented accuracy.
                </p>
              </div>
            </div>

            <div className="bg-primary-50/10 p-6 sm:p-8 border border-neutral-200/20 backdrop-blur-sm shadow-xl rounded-2xl order-1 md:order-2">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-50 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-50 mb-2 text-sm sm:text-base">Input Your Product Data</h4>
                    <p className="text-primary-100 text-xs sm:text-sm">Describe your AI product, target market, and key features</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-50 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-50 mb-2 text-sm sm:text-base">LLM Analysis</h4>
                    <p className="text-primary-100 text-xs sm:text-sm">Advanced language models analyze market trends and competitors</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-50 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-50 mb-2 text-sm sm:text-base">Get Precise Fit Score</h4>
                    <p className="text-primary-100 text-xs sm:text-sm">Receive detailed market fit calculations and actionable insights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-6 bg-primary-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-50 mb-6">
            Ready to Find Your Market Fit?
          </h2>
          <p className="text-lg sm:text-xl text-primary-100 mb-8 max-w-2xl mx-auto px-4">
            Be among the first to access Echo Ridge when we launch. Join our waitlist for early updates and exclusive access.
          </p>
          <button 
            onClick={() => setShowWaitlistModal(true)}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-secondary-500/20 text-primary-50 text-base sm:text-lg font-semibold backdrop-blur-sm border border-secondary-500/40 rounded-lg sm:rounded-none hover:bg-secondary-500/30 transition-all duration-200 mb-8 sm:mb-12 w-full sm:w-auto beveled-button-subtle"
          >
            Join Waitlist
          </button>
          <p className="text-primary-100 text-xs sm:text-sm">
            © 2025 Project Echo Ridge. All rights reserved.
          </p>
        </div>
      </section>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-primary-800/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-primary-300 to-primary-400 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-primary-100/20 transform animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-primary-50">Contact Us</h3>
              <button 
                onClick={() => setShowContactModal(false)}
                className="text-primary-100 hover:text-primary-50 text-2xl transition-colors"
              >
                ×
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleContactSubmit}>
              <div>
                <label className="block text-primary-50 text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-primary-50/10 border border-primary-100/20 rounded-lg text-primary-50 placeholder-primary-100 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-primary-50 text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-primary-50/10 border border-primary-100/20 rounded-lg text-primary-50 placeholder-primary-100 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-primary-50 text-sm font-medium mb-2">Message</label>
                <textarea 
                  rows={4}
                  name="message"
                  required
                  className="w-full px-4 py-3 bg-primary-50/10 border border-primary-100/20 rounded-lg text-primary-50 placeholder-primary-100 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-secondary-600 text-primary-50 font-semibold rounded-lg hover:bg-secondary-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <div className="fixed inset-0 bg-primary-800/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-primary-300 to-primary-400 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-primary-100/20 transform animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-primary-50">Join Our Waitlist</h3>
              <button 
                onClick={() => setShowWaitlistModal(false)}
                className="text-primary-100 hover:text-primary-50 text-2xl transition-colors"
              >
                ×
              </button>
            </div>
            <div className="mb-6">
              <p className="text-primary-100 text-sm leading-relaxed">
                Be among the first to experience Echo Ridge. Get early access, exclusive updates, and help shape the future of AI market intelligence.
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleWaitlistSubmit}>
              <div>
                <label className="block text-primary-50 text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-primary-50/10 border border-primary-100/20 rounded-lg text-primary-50 placeholder-primary-100 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-primary-50 text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-primary-50/10 border border-primary-100/20 rounded-lg text-primary-50 placeholder-primary-100 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-primary-50 text-sm font-medium mb-2">Company (Optional)</label>
                <input 
                  type="text" 
                  name="company"
                  className="w-full px-4 py-3 bg-primary-50/10 border border-primary-100/20 rounded-lg text-primary-50 placeholder-primary-100 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:border-transparent transition-all"
                  placeholder="Your company"
                />
              </div>
              <div className="flex items-start space-x-3">
                <input 
                  type="checkbox" 
                  id="updates"
                  name="updates"
                  className="mt-1 w-4 h-4 text-secondary-600 bg-primary-50/10 border-primary-100/20 rounded focus:ring-secondary-200 focus:ring-2"
                />
                <label htmlFor="updates" className="text-primary-100 text-xs leading-relaxed">
                  I'd like to receive updates about Echo Ridge development and early access opportunities.
                </label>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-secondary-600 text-primary-50 font-semibold rounded-lg hover:bg-secondary-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 animate-toast-in">
          <div className={`px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm border transform transition-all duration-300 ${
            toast.type === 'success' 
              ? 'bg-secondary-600/90 border-secondary-500/50 text-primary-50' 
              : 'bg-red-600/90 border-red-500/50 text-white'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                toast.type === 'success' ? 'bg-secondary-200' : 'bg-red-200'
              }`}></div>
              <span className="font-medium">{toast.message}</span>
              <button 
                onClick={() => setToast({ show: false, message: '', type: 'success' })}
                className="ml-2 text-current/70 hover:text-current transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}