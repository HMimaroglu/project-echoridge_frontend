import { chromium, FullConfig } from '@playwright/test'

async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use?.baseURL

  // Launch browser and create a new context
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  try {
    // Wait for the application to be ready
    console.log('🔧 Starting global setup...')
    
    if (baseURL) {
      console.log(`🌐 Checking if ${baseURL} is accessible...`)
      await page.goto(baseURL, { waitUntil: 'networkidle' })
      
      // Wait for the main content to load
      await page.waitForSelector('body', { timeout: 30000 })
      console.log('✅ Application is ready for testing')
    }

    // You can add more global setup here, such as:
    // - Authentication setup
    // - Database seeding
    // - Environment preparation
    
  } catch (error) {
    console.error('❌ Global setup failed:', error)
    throw error
  } finally {
    await page.close()
    await context.close()
    await browser.close()
  }

  console.log('✅ Global setup completed')
}

export default globalSetup