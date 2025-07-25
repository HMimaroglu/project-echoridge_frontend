export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-400">
      {/* Hero Section */}
      <section className="flex items-end justify-start min-h-screen px-6 pb-4 relative parallax-bg" style={{backgroundImage: 'url(/echo-ridge-background.png)'}} >
        <div className="absolute inset-0 bg-gradient-to-t from-primary-500/60 via-primary-500/20 to-transparent"></div>
        <div className="text-left max-w-3xl relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold text-primary-50 mb-4 tracking-tight drop-shadow-2xl fade-in-up font-serif">
            Project Echo Ridge
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 mb-6 fade-in-up animate-delay-200">
            <button className="px-6 py-3 bg-transparent text-primary-50 text-base font-medium backdrop-blur-sm">
              Contact Us
            </button>
            <button className="px-6 py-3 bg-transparent text-primary-50 text-base font-medium backdrop-blur-sm">
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
            <h2 className="text-4xl md:text-5xl font-bold text-primary-50 mb-6 relative">
              How It Works
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-secondary-200 to-transparent"></div>
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Advanced language model analysis combined with proprietary algorithms to calculate precise market fit for your AI products
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-primary-50/10 p-10 border border-primary-100/20 backdrop-blur-sm rounded-2xl fade-in-up animate-delay-100 relative group hover:bg-primary-50/15 transition-all duration-300">
              <div className="absolute top-4 right-4 w-2 h-2 bg-secondary-200 rounded-full opacity-60"></div>
              <div className="absolute top-6 right-6 w-1 h-1 bg-secondary-50 rounded-full opacity-40"></div>
              <h3 className="text-2xl font-bold text-primary-50 mb-4">LLM-Powered Analysis</h3>
              <p className="text-primary-100 leading-relaxed">
                Harness the power of advanced language models to analyze market trends, competitor landscapes, and positioning opportunities with unprecedented depth.
              </p>
            </div>

            <div className="bg-primary-50/10 p-10 border border-primary-100/20 backdrop-blur-sm rounded-2xl fade-in-up animate-delay-200 relative group hover:bg-primary-50/15 transition-all duration-300">
              <div className="absolute top-4 right-4 w-2 h-2 bg-secondary-200 rounded-full opacity-60"></div>
              <div className="absolute top-6 right-6 w-1 h-1 bg-secondary-50 rounded-full opacity-40"></div>
              <h3 className="text-2xl font-bold text-primary-50 mb-4">Open Source</h3>
              <p className="text-primary-100 leading-relaxed">
                Built by the community, for the community. Transparent algorithms, collaborative development, and accessible to organizations of all sizes.
              </p>
            </div>

            <div className="bg-primary-50/10 p-10 border border-primary-100/20 backdrop-blur-sm rounded-2xl fade-in-up animate-delay-300 relative group hover:bg-primary-50/15 transition-all duration-300">
              <div className="absolute top-4 right-4 w-2 h-2 bg-secondary-200 rounded-full opacity-60"></div>
              <div className="absolute top-6 right-6 w-1 h-1 bg-secondary-50 rounded-full opacity-40"></div>
              <h3 className="text-2xl font-bold text-primary-50 mb-4">Custom Fit Algorithms</h3>
              <p className="text-primary-100 leading-relaxed">
                Proprietary matching algorithms that go beyond basic market research to provide precise fit calculations tailored to your specific AI product.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen flex items-center px-6 bg-gradient-to-br from-primary-400 to-primary-300">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-50 mb-6">
              About Project Echo Ridge
            </h2>
            <p className="text-xl text-primary-100">
              Bridging the gap between AI innovation and market reality
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-primary-50 mb-4">Our Mission</h3>
                <p className="text-lg text-primary-100 leading-relaxed">
                  To democratize access to sophisticated market intelligence, enabling both startups and enterprises to make data-driven positioning decisions for their AI products.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-primary-50 mb-4">How It Works</h3>
                <p className="text-lg text-primary-100 leading-relaxed">
                  Our platform combines advanced language model analysis with proprietary algorithms to evaluate market dynamics, competitive positioning, and product-market fit with unprecedented accuracy.
                </p>
              </div>
            </div>

            <div className="bg-primary-50/10 p-8 border border-neutral-200/20 backdrop-blur-sm shadow-xl">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-50 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-50 mb-2">Input Your Product Data</h4>
                    <p className="text-primary-100 text-sm">Describe your AI product, target market, and key features</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-50 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-50 mb-2">LLM Analysis</h4>
                    <p className="text-primary-100 text-sm">Advanced language models analyze market trends and competitors</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-50 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-50 mb-2">Get Precise Fit Score</h4>
                    <p className="text-primary-100 text-sm">Receive detailed market fit calculations and actionable insights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-16 pb-8 px-6 bg-primary-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-50 mb-6">
            Ready to Find Your Market Fit?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Be among the first to access Echo Ridge when we launch. Join our waitlist for early updates and exclusive access.
          </p>
          <button className="px-8 py-4 bg-secondary-500/20 text-primary-50 text-lg font-semibold backdrop-blur-sm border border-secondary-500/40 mb-12">
            Join Waitlist
          </button>
          <p className="text-primary-100 text-sm">
            © 2025 Project Echo Ridge. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  )
}