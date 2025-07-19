import { test, expect } from '@playwright/test'

test.describe('Performance Tests', () => {
  test.describe('Core Web Vitals', () => {
    test('should meet Core Web Vitals thresholds', async ({ page }) => {
      // Navigate to the page
      await page.goto('/', { waitUntil: 'networkidle' })

      // Get Core Web Vitals metrics
      const vitals = await page.evaluate(() => {
        return new Promise((resolve) => {
          const vitals = {
            LCP: 0,
            FID: 0,
            CLS: 0,
            FCP: 0,
            TTFB: 0,
          }

          // Largest Contentful Paint
          new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            vitals.LCP = lastEntry.startTime
          }).observe({ type: 'largest-contentful-paint', buffered: true })

          // First Input Delay (needs real user interaction)
          new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry) => {
              vitals.FID = entry.processingStart - entry.startTime
            })
          }).observe({ type: 'first-input', buffered: true })

          // Cumulative Layout Shift
          new PerformanceObserver((list) => {
            let cls = 0
            list.getEntries().forEach((entry) => {
              if (!(entry as any).hadRecentInput) {
                cls += (entry as any).value
              }
            })
            vitals.CLS = cls
          }).observe({ type: 'layout-shift', buffered: true })

          // First Contentful Paint
          new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            vitals.FCP = lastEntry.startTime
          }).observe({ type: 'paint', buffered: true })

          // Time to First Byte
          const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
          vitals.TTFB = navigationEntry.responseStart - navigationEntry.requestStart

          setTimeout(() => resolve(vitals), 3000)
        })
      })

      console.log('Core Web Vitals:', vitals)

      // Assert Core Web Vitals thresholds
      expect(vitals.LCP).toBeLessThan(2500) // Good: < 2.5s
      expect(vitals.FCP).toBeLessThan(1800) // Good: < 1.8s
      expect(vitals.CLS).toBeLessThan(0.1) // Good: < 0.1
      expect(vitals.TTFB).toBeLessThan(800) // Good: < 800ms
    })

    test('should have fast Time to Interactive', async ({ page }) => {
      const startTime = Date.now()
      
      await page.goto('/', { waitUntil: 'networkidle' })
      
      // Measure when the page becomes interactive
      const tti = await page.evaluate(() => {
        return new Promise((resolve) => {
          const measureTTI = () => {
            const now = performance.now()
            // Simple heuristic: when main thread is stable
            setTimeout(() => resolve(now), 100)
          }
          
          if (document.readyState === 'complete') {
            measureTTI()
          } else {
            window.addEventListener('load', measureTTI)
          }
        })
      })

      console.log('Time to Interactive:', tti, 'ms')
      expect(tti).toBeLessThan(3800) // Good TTI threshold
    })

    test('should have minimal layout shift during navigation', async ({ page }) => {
      await page.goto('/')
      
      // Track layout shifts during navigation
      let totalCLS = 0
      
      await page.evaluate(() => {
        let cls = 0
        new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (!(entry as any).hadRecentInput) {
              cls += (entry as any).value
            }
          })
          ;(window as any).totalCLS = cls
        }).observe({ type: 'layout-shift', buffered: true })
      })

      // Navigate through sections
      await page.getByRole('link', { name: /how it works/i }).click()
      await page.waitForTimeout(1000)
      
      await page.getByRole('link', { name: /benefits/i }).click()
      await page.waitForTimeout(1000)
      
      await page.getByRole('link', { name: /timeline/i }).click()
      await page.waitForTimeout(1000)

      // Get final CLS score
      totalCLS = await page.evaluate(() => (window as any).totalCLS || 0)
      
      console.log('Total CLS during navigation:', totalCLS)
      expect(totalCLS).toBeLessThan(0.25) // Should be minimal
    })
  })

  test.describe('Resource Loading', () => {
    test('should load all critical resources quickly', async ({ page }) => {
      const responses: any[] = []
      
      page.on('response', response => {
        responses.push({
          url: response.url(),
          status: response.status(),
          timing: response.timing(),
          size: response.headers()['content-length']
        })
      })

      await page.goto('/', { waitUntil: 'networkidle' })

      // Check that all resources loaded successfully
      const failedRequests = responses.filter(r => r.status >= 400)
      expect(failedRequests).toHaveLength(0)

      // Check critical resource timing
      const htmlResponse = responses.find(r => r.url.includes('/') && !r.url.includes('.'))
      if (htmlResponse?.timing) {
        const totalTime = htmlResponse.timing.responseEnd - htmlResponse.timing.requestStart
        expect(totalTime).toBeLessThan(1000) // HTML should load within 1s
      }

      // Check CSS loading
      const cssResponses = responses.filter(r => r.url.includes('.css'))
      cssResponses.forEach(css => {
        if (css.timing) {
          const loadTime = css.timing.responseEnd - css.timing.requestStart
          expect(loadTime).toBeLessThan(2000) // CSS should load within 2s
        }
      })

      // Check JS loading
      const jsResponses = responses.filter(r => r.url.includes('.js'))
      jsResponses.forEach(js => {
        if (js.timing) {
          const loadTime = js.timing.responseEnd - js.timing.requestStart
          expect(loadTime).toBeLessThan(3000) // JS should load within 3s
        }
      })
    })

    test('should optimize image loading', async ({ page }) => {
      const imageRequests: any[] = []
      
      page.on('response', response => {
        if (response.url().match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
          imageRequests.push({
            url: response.url(),
            status: response.status(),
            size: response.headers()['content-length']
          })
        }
      })

      await page.goto('/', { waitUntil: 'networkidle' })

      // Check that images are properly optimized
      imageRequests.forEach(img => {
        expect(img.status).toBe(200) // All images should load successfully
        
        if (img.size) {
          const sizeKB = parseInt(img.size) / 1024
          
          // Hero images can be larger, but regular images should be reasonable
          if (img.url.includes('hero') || img.url.includes('banner')) {
            expect(sizeKB).toBeLessThan(500) // Hero images < 500KB
          } else {
            expect(sizeKB).toBeLessThan(200) // Regular images < 200KB
          }
        }
      })
    })

    test('should have efficient caching strategy', async ({ page, context }) => {
      // First visit
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Second visit (should use cache)
      const startTime = Date.now()
      await page.goto('/', { waitUntil: 'networkidle' })
      const loadTime = Date.now() - startTime

      // Second load should be faster due to caching
      expect(loadTime).toBeLessThan(1000) // Should load from cache quickly
    })
  })

  test.describe('Runtime Performance', () => {
    test('should have smooth scrolling performance', async ({ page }) => {
      await page.goto('/')
      
      // Measure frame rate during scrolling
      await page.evaluate(() => {
        let frameCount = 0
        let lastTime = performance.now()
        
        const measureFPS = () => {
          const currentTime = performance.now()
          frameCount++
          
          if (currentTime - lastTime >= 1000) {
            const fps = frameCount
            frameCount = 0
            lastTime = currentTime
            ;(window as any).currentFPS = fps
          }
          
          requestAnimationFrame(measureFPS)
        }
        
        measureFPS()
      })

      // Perform scrolling
      await page.mouse.wheel(0, 500)
      await page.waitForTimeout(1000)
      await page.mouse.wheel(0, 500)
      await page.waitForTimeout(1000)
      await page.mouse.wheel(0, -1000)
      await page.waitForTimeout(1000)

      // Check FPS
      const fps = await page.evaluate(() => (window as any).currentFPS || 0)
      console.log('Scrolling FPS:', fps)
      expect(fps).toBeGreaterThan(30) // Should maintain > 30 FPS
    })

    test('should handle rapid interactions efficiently', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')

      const startTime = Date.now()

      // Rapid mobile menu toggling
      const mobileMenuButton = page.getByRole('button', { name: /open navigation menu/i })
      
      for (let i = 0; i < 10; i++) {
        await mobileMenuButton.click()
        await page.waitForTimeout(50)
        
        const closeButton = page.getByRole('button', { name: /close navigation menu/i })
        await closeButton.click()
        await page.waitForTimeout(50)
      }

      const totalTime = Date.now() - startTime
      console.log('Rapid interaction time:', totalTime, 'ms')
      
      // Should handle rapid interactions without significant delay
      expect(totalTime).toBeLessThan(2000)
      
      // Page should still be responsive
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    })

    test('should have efficient memory usage', async ({ page }) => {
      await page.goto('/')

      // Get initial memory usage
      const initialMemory = await page.evaluate(() => {
        return (performance as any).memory ? {
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize
        } : null
      })

      // Simulate navigation and interactions
      await page.getByRole('link', { name: /how it works/i }).click()
      await page.waitForTimeout(1000)
      
      await page.getByRole('link', { name: /benefits/i }).click()
      await page.waitForTimeout(1000)
      
      await page.getByRole('link', { name: /timeline/i }).click()
      await page.waitForTimeout(1000)

      // Get final memory usage
      const finalMemory = await page.evaluate(() => {
        return (performance as any).memory ? {
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize
        } : null
      })

      if (initialMemory && finalMemory) {
        const memoryIncrease = finalMemory.usedJSHeapSize - initialMemory.usedJSHeapSize
        const increasePercent = (memoryIncrease / initialMemory.usedJSHeapSize) * 100
        
        console.log('Memory increase:', increasePercent.toFixed(2), '%')
        
        // Memory usage shouldn't increase dramatically
        expect(increasePercent).toBeLessThan(50) // Less than 50% increase
      }
    })
  })

  test.describe('Network Performance', () => {
    test('should minimize network requests', async ({ page }) => {
      let requestCount = 0
      
      page.on('request', request => {
        requestCount++
      })

      await page.goto('/', { waitUntil: 'networkidle' })

      console.log('Total network requests:', requestCount)
      
      // Should not make excessive requests
      expect(requestCount).toBeLessThan(50) // Reasonable limit for initial page load
    })

    test('should handle slow network gracefully', async ({ page, context }) => {
      // Simulate slow 3G connection
      await context.setExtraHTTPHeaders({})
      
      // Override network to simulate slow connection
      await page.route('**/*', route => {
        setTimeout(() => {
          route.continue()
        }, 100) // Add 100ms delay to all requests
      })

      const startTime = Date.now()
      await page.goto('/', { waitUntil: 'domcontentloaded' })
      const loadTime = Date.now() - startTime

      // Page should still load within reasonable time on slow connection
      expect(loadTime).toBeLessThan(10000) // 10 seconds max

      // Core content should be visible
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    })

    test('should work offline with service worker (if implemented)', async ({ page, context }) => {
      // First visit to cache resources
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Simulate offline
      await context.setOffline(true)

      try {
        await page.goto('/')
        
        // If service worker is implemented, basic content should still load
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 5000 })
      } catch (error) {
        // If no service worker, that's okay - just log it
        console.log('No offline support detected (service worker not implemented)')
      }

      // Restore online
      await context.setOffline(false)
    })
  })

  test.describe('Rendering Performance', () => {
    test('should render above-the-fold content quickly', async ({ page }) => {
      const startTime = Date.now()
      
      await page.goto('/')
      
      // Wait for hero content to be visible (above-the-fold)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      
      const renderTime = Date.now() - startTime
      console.log('Above-the-fold render time:', renderTime, 'ms')
      
      // Above-the-fold content should render quickly
      expect(renderTime).toBeLessThan(2000) // Within 2 seconds
    })

    test('should lazy load below-the-fold content', async ({ page }) => {
      await page.goto('/')
      
      // Check if images/content below the fold are lazy loaded
      const belowFoldImages = page.locator('img').nth(3) // Assuming first few are above fold
      
      if (await belowFoldImages.count() > 0) {
        // Image shouldn't be loaded initially
        const initialSrc = await belowFoldImages.getAttribute('src')
        
        // Scroll to bring image into view
        await belowFoldImages.scrollIntoViewIfNeeded()
        
        // Image should now be loaded (if lazy loading is implemented)
        await expect(belowFoldImages).toBeVisible()
      }
    })

    test('should have smooth animations', async ({ page }) => {
      await page.goto('/')
      
      // Measure animation frame rate
      const animationFPS = await page.evaluate(() => {
        return new Promise((resolve) => {
          let frames = 0
          const startTime = performance.now()
          
          const countFrames = () => {
            frames++
            const currentTime = performance.now()
            
            if (currentTime - startTime >= 1000) {
              resolve(frames)
            } else {
              requestAnimationFrame(countFrames)
            }
          }
          
          requestAnimationFrame(countFrames)
        })
      })

      console.log('Animation FPS:', animationFPS)
      expect(animationFPS).toBeGreaterThan(45) // Smooth animations should be > 45 FPS
    })
  })

  test.describe('Bundle Size and Code Efficiency', () => {
    test('should have reasonable JavaScript bundle size', async ({ page }) => {
      const jsRequests: any[] = []
      
      page.on('response', response => {
        if (response.url().includes('.js') && response.status() === 200) {
          jsRequests.push({
            url: response.url(),
            size: response.headers()['content-length']
          })
        }
      })

      await page.goto('/', { waitUntil: 'networkidle' })

      const totalJSSize = jsRequests.reduce((total, request) => {
        return total + (parseInt(request.size) || 0)
      }, 0)

      const totalSizeKB = totalJSSize / 1024
      console.log('Total JS bundle size:', totalSizeKB.toFixed(2), 'KB')

      // Total JS should be reasonable for a modern app
      expect(totalSizeKB).toBeLessThan(1000) // Less than 1MB
    })

    test('should not have unused CSS/JS', async ({ page }) => {
      // Enable coverage
      await Promise.all([
        page.coverage.startJSCoverage(),
        page.coverage.startCSSCoverage()
      ])

      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Get coverage data
      const [jsCoverage, cssCoverage] = await Promise.all([
        page.coverage.stopJSCoverage(),
        page.coverage.stopCSSCoverage()
      ])

      // Calculate unused code percentage
      let totalJSBytes = 0
      let usedJSBytes = 0
      
      jsCoverage.forEach(entry => {
        totalJSBytes += entry.text.length
        entry.ranges.forEach(range => {
          usedJSBytes += range.end - range.start - 1
        })
      })

      let totalCSSBytes = 0
      let usedCSSBytes = 0
      
      cssCoverage.forEach(entry => {
        totalCSSBytes += entry.text.length
        entry.ranges.forEach(range => {
          usedCSSBytes += range.end - range.start - 1
        })
      })

      const jsUsagePercent = totalJSBytes > 0 ? (usedJSBytes / totalJSBytes) * 100 : 100
      const cssUsagePercent = totalCSSBytes > 0 ? (usedCSSBytes / totalCSSBytes) * 100 : 100

      console.log('JS Usage:', jsUsagePercent.toFixed(2), '%')
      console.log('CSS Usage:', cssUsagePercent.toFixed(2), '%')

      // Should have reasonable code usage (allowing for initial page load)
      expect(jsUsagePercent).toBeGreaterThan(30) // At least 30% JS should be used
      expect(cssUsagePercent).toBeGreaterThan(40) // At least 40% CSS should be used
    })
  })
})