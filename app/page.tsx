export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-block px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-8">
            Open Source • AI-Powered • Market Intelligence
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-neutral-900 mb-8 tracking-tight">
            Project Echo Ridge
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 mb-12 font-light leading-relaxed max-w-3xl mx-auto">
            Advanced language model analysis combined with proprietary algorithms to calculate precise market fit for your AI products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-primary-600 text-white text-lg font-semibold hover:bg-primary-700 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Try It Now
            </button>
            <button className="px-8 py-4 bg-transparent text-primary-700 text-lg font-semibold border-2 border-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-300 rounded-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Why Echo Ridge?
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Democratizing access to sophisticated market intelligence through open source innovation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">LLM-Powered Analysis</h3>
              <p className="text-neutral-600 leading-relaxed">
                Harness the power of advanced language models to analyze market trends, competitor landscapes, and positioning opportunities with unprecedented depth.
              </p>
            </div>

            <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-secondary-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Open Source</h3>
              <p className="text-neutral-600 leading-relaxed">
                Built by the community, for the community. Transparent algorithms, collaborative development, and accessible to organizations of all sizes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-neutral-700 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Custom Fit Algorithms</h3>
              <p className="text-neutral-600 leading-relaxed">
                Proprietary matching algorithms that go beyond basic market research to provide precise fit calculations tailored to your specific AI product.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-neutral-50 to-primary-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              About Project Echo Ridge
            </h2>
            <p className="text-xl text-neutral-600">
              Bridging the gap between AI innovation and market reality
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Our Mission</h3>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  To democratize access to sophisticated market intelligence, enabling both startups and enterprises to make data-driven positioning decisions for their AI products.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">How It Works</h3>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  Our platform combines advanced language model analysis with proprietary algorithms to evaluate market dynamics, competitive positioning, and product-market fit with unprecedented accuracy.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2">Input Your Product Data</h4>
                    <p className="text-neutral-600 text-sm">Describe your AI product, target market, and key features</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2">LLM Analysis</h4>
                    <p className="text-neutral-600 text-sm">Advanced language models analyze market trends and competitors</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2">Get Precise Fit Score</h4>
                    <p className="text-neutral-600 text-sm">Receive detailed market fit calculations and actionable insights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Market Fit?
          </h2>
          <p className="text-xl text-primary-100 mb-12 max-w-2xl mx-auto">
            Join the growing community of AI companies using Echo Ridge to make smarter positioning decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-primary-600 text-lg font-semibold hover:bg-primary-50 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Get Started Now
            </button>
            <button className="px-8 py-4 bg-transparent text-white text-lg font-semibold border-2 border-white hover:bg-white hover:text-primary-600 transition-all duration-300 rounded-lg">
              View on GitHub
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}