import { FullConfig } from '@playwright/test'

async function globalTeardown(_config: FullConfig) {
  console.log('🧹 Starting global teardown...')

  try {
    // Add any cleanup logic here, such as:
    // - Cleaning up test data
    // - Stopping additional services
    // - Clearing caches
    
    console.log('✅ Global teardown completed')
  } catch (error) {
    console.error('❌ Global teardown failed:', error)
    throw error
  }
}

export default globalTeardown