export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-light text-primary-900 mb-8 tracking-tight">
            Project Echo Ridge
          </h1>
          <p className="text-xl md:text-2xl text-primary-600 mb-12 font-light leading-relaxed">
            Open source AI-powered market analysis for intelligent product positioning
          </p>
          <button className="px-8 py-4 bg-primary-900 text-white text-lg font-medium hover:bg-primary-800 transition-colors duration-200 border border-primary-900 hover:border-primary-800">
            Try It Now
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 bg-primary-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-light text-primary-900 mb-12">
            About
          </h2>
          <div className="space-y-8 text-lg text-primary-700 leading-relaxed">
            <p>
              Project Echo Ridge leverages advanced language model analysis combined with proprietary algorithms to provide companies with precise market fit calculations for their AI products.
            </p>
            <p>
              Built as an open source initiative, our platform democratizes access to sophisticated market intelligence, enabling both startups and enterprises to make data-driven positioning decisions.
            </p>
            <p>
              Through careful analysis and custom fitting algorithms, we deliver insights that help you understand where your product fits in the competitive landscape.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}