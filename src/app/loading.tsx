import { 
  Container, 
  Skeleton, 
  SkeletonCard, 
  SkeletonText,
  GridContainer 
} from '@/components/ui'

// Loading component for the entire page
export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <header className="border-b border-neutral-200 bg-white">
        <Container size="xl" padding>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <Skeleton variant="circular" width={32} height={32} />
              <div className="space-y-1">
                <Skeleton width={120} height={16} />
                <Skeleton width={80} height={12} />
              </div>
            </div>
            
            <nav className="hidden md:flex md:items-center md:space-x-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} width={60} height={32} className="rounded-md" />
              ))}
            </nav>
            
            <div className="hidden lg:flex lg:items-center lg:space-x-3">
              <Skeleton width={70} height={32} className="rounded-md" />
              <Skeleton width={90} height={32} className="rounded-md" />
            </div>
          </div>
        </Container>
      </header>

      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-br from-navy-900 via-primary-900 to-secondary-900 py-20 sm:py-24 lg:py-32">
        <Container size="xl" padding>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 space-y-4">
              <Skeleton height={48} className="mx-auto max-w-2xl" />
              <Skeleton height={40} className="mx-auto max-w-lg" />
            </div>
            
            <div className="mb-8">
              <Skeleton height={20} className="mx-auto max-w-2xl mb-2" />
              <Skeleton height={20} className="mx-auto max-w-xl" />
            </div>
            
            <div className="flex justify-center space-x-4 mb-12">
              <Skeleton width={140} height={44} className="rounded-md" />
              <Skeleton width={160} height={44} className="rounded-md" />
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center space-y-2">
                  <Skeleton height={32} width={80} className="mx-auto" />
                  <Skeleton height={16} width={100} className="mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Services Section Skeleton */}
      <section className="py-12 sm:py-16 lg:py-20">
        <Container size="xl" padding>
          <div className="text-center mb-16">
            <Skeleton height={40} width={400} className="mx-auto mb-4" />
            <div className="mx-auto max-w-3xl space-y-2">
              <Skeleton height={20} />
              <Skeleton height={20} width="80%" className="mx-auto" />
            </div>
          </div>

          <GridContainer cols={2} gap="lg">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </GridContainer>
        </Container>
      </section>

      {/* Process Section Skeleton */}
      <section className="bg-neutral-50 py-12 sm:py-16 lg:py-20">
        <Container size="xl" padding>
          <div className="text-center mb-16">
            <Skeleton height={40} width={350} className="mx-auto mb-4" />
            <div className="mx-auto max-w-3xl space-y-2">
              <Skeleton height={20} />
              <Skeleton height={20} width="70%" className="mx-auto" />
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton variant="circular" width={64} height={64} className="mx-auto mb-4" />
                <Skeleton height={24} width={120} className="mx-auto mb-3" />
                <SkeletonText lines={3} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits Section Skeleton */}
      <section className="py-12 sm:py-16 lg:py-20">
        <Container size="xl" padding>
          <div className="text-center mb-16">
            <Skeleton height={40} width={420} className="mx-auto mb-4" />
            <div className="mx-auto max-w-3xl space-y-2">
              <Skeleton height={20} />
              <Skeleton height={20} width="85%" className="mx-auto" />
            </div>
          </div>

          <GridContainer cols={3} gap="lg" className="md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton variant="circular" width={64} height={64} className="mx-auto mb-6" />
                <Skeleton height={20} width={100} className="mx-auto mb-3" />
                <SkeletonText lines={2} />
              </div>
            ))}
          </GridContainer>
        </Container>
      </section>

      {/* Team Section Skeleton */}
      <section className="bg-neutral-50 py-12 sm:py-16 lg:py-20">
        <Container size="xl" padding>
          <div className="text-center mb-16">
            <Skeleton height={40} width={300} className="mx-auto mb-4" />
            <div className="mx-auto max-w-3xl space-y-2">
              <Skeleton height={20} />
              <Skeleton height={20} width="75%" className="mx-auto" />
            </div>
          </div>

          <GridContainer cols={3} gap="lg" className="md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg border border-neutral-200 p-6 text-center">
                <Skeleton variant="circular" width={96} height={96} className="mx-auto mb-4" />
                <Skeleton height={20} width={120} className="mx-auto mb-1" />
                <Skeleton height={16} width={100} className="mx-auto mb-4" />
                <div className="space-y-2 mb-4">
                  <Skeleton height={14} />
                  <Skeleton height={14} width="90%" className="mx-auto" />
                </div>
                <div className="flex justify-center space-x-2 mb-2">
                  <Skeleton width={40} height={20} className="rounded-full" />
                  <Skeleton width={35} height={20} className="rounded-full" />
                </div>
                <Skeleton height={12} width="80%" className="mx-auto" />
              </div>
            ))}
          </GridContainer>
        </Container>
      </section>

      {/* CTA Section Skeleton */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-600 py-12 sm:py-16 lg:py-20">
        <Container size="xl" padding>
          <div className="text-center">
            <Skeleton height={36} width={400} className="mx-auto mb-6" />
            <div className="mx-auto max-w-2xl mb-8 space-y-2">
              <Skeleton height={20} />
              <Skeleton height={20} width="80%" className="mx-auto" />
            </div>
            
            <div className="flex justify-center space-x-4 mb-8">
              <Skeleton width={160} height={44} className="rounded-md" />
              <Skeleton width={140} height={44} className="rounded-md" />
            </div>
            
            <Skeleton height={14} width={300} className="mx-auto" />
          </div>
        </Container>
      </section>

      {/* Footer Skeleton */}
      <footer className="bg-navy-900">
        <Container size="xl" padding>
          <div className="py-12 lg:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="flex items-center space-x-3 mb-6">
                  <Skeleton variant="circular" width={40} height={40} />
                  <div className="space-y-1">
                    <Skeleton width={140} height={20} />
                    <Skeleton width={100} height={14} />
                  </div>
                </div>
                <SkeletonText lines={3} className="mb-6" />
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Skeleton variant="circular" width={16} height={16} />
                      <Skeleton width={120} height={14} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-8">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i}>
                      <Skeleton width={80} height={16} className="mb-4" />
                      <div className="space-y-3">
                        {Array.from({ length: 4 }).map((_, j) => (
                          <Skeleton key={j} width={70} height={14} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Newsletter Section Skeleton */}
        <div className="border-t border-neutral-800">
          <Container size="xl" padding>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center">
                <div>
                  <Skeleton width={250} height={20} className="mb-2" />
                  <Skeleton width={200} height={16} />
                </div>
                <div className="lg:justify-end lg:flex">
                  <div className="flex max-w-md space-x-3">
                    <Skeleton width={200} height={40} className="rounded-md" />
                    <Skeleton width={90} height={40} className="rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Bottom Footer Skeleton */}
        <div className="border-t border-neutral-800">
          <Container size="xl" padding>
            <div className="flex flex-col items-center justify-between space-y-4 py-6 md:flex-row md:space-y-0">
              <div className="flex items-center space-x-6">
                <Skeleton width={200} height={14} />
                <div className="flex space-x-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} width={60} height={14} />
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} variant="circular" width={20} height={20} />
                ))}
              </div>
            </div>
          </Container>
        </div>
      </footer>
    </div>
  )
}