'use client'

import Link from 'next/link'
import { getCurrentYear } from '@/lib/utils'
import { COMPANY, NAVIGATION } from '@/lib/constants'
import { FooterProps } from '@/types'
import { 
  Container, 
  Text, 
  H3, 
  Button,
  LinkedinIcon,
  TwitterIcon,
  GithubIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon
} from '@/components/ui'

export const Footer = ({ minimal = false }: FooterProps) => {
  const currentYear = getCurrentYear()

  if (minimal) {
    return (
      <footer className="border-t border-neutral-200 bg-white">
        <Container size="xl" padding>
          <div className="flex flex-col items-center justify-between space-y-4 py-6 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-lg font-bold text-navy-900 transition-colors hover:text-primary-600"
              >
                {COMPANY.name}
              </Link>
            </div>
            
            <Text size="sm" variant="muted">
              © {currentYear} {COMPANY.name}. All rights reserved.
            </Text>
          </div>
        </Container>
      </footer>
    )
  }

  return (
    <footer className="bg-navy-900 text-white">
      {/* Main Footer Content */}
      <Container size="xl" padding>
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Company Info */}
            <div className="lg:col-span-4">
              <div className="mb-6">
                <Link
                  href="/"
                  className="flex items-center space-x-3 transition-colors hover:opacity-80"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2L2 7v10c0 5.55 3.84 10 9 10s9-4.45 9-10V7l-10-5zM10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{COMPANY.name}</div>
                    <div className="text-sm text-neutral-300">{COMPANY.tagline}</div>
                  </div>
                </Link>
              </div>

              <Text className="mb-6 text-neutral-300 leading-relaxed">
                {COMPANY.description}
              </Text>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-neutral-300">
                  <PhoneIcon size="sm" className="text-primary-400" />
                  <span>{COMPANY.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-neutral-300">
                  <MailIcon size="sm" className="text-primary-400" />
                  <span>{COMPANY.email}</span>
                </div>
                <div className="flex items-start space-x-3 text-sm text-neutral-300">
                  <MapPinIcon size="sm" className="mt-0.5 text-primary-400 flex-shrink-0" />
                  <div>
                    <div>{COMPANY.address.street}</div>
                    <div>
                      {COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.zip}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                {NAVIGATION.footer.map((section) => (
                  <div key={section.title}>
                    <H3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                      {section.title}
                    </H3>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="text-sm text-neutral-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Newsletter Signup */}
      <div className="border-t border-neutral-800">
        <Container size="xl" padding>
          <div className="py-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center">
              <div>
                <H3 className="mb-2 text-lg font-semibold text-white">
                  Stay informed with market insights
                </H3>
                <Text className="text-neutral-300">
                  Get our latest research, market updates, and investment insights delivered to your inbox.
                </Text>
              </div>
              <div className="lg:justify-end lg:flex">
                <div className="flex max-w-md space-x-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 rounded-md border-neutral-600 bg-neutral-800 px-4 py-2 text-white placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label="Email address for newsletter"
                  />
                  <Button variant="primary" size="md">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-neutral-800">
        <Container size="xl" padding>
          <div className="flex flex-col items-center justify-between space-y-4 py-6 md:flex-row md:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col space-y-1 text-center md:flex-row md:space-x-6 md:space-y-0 md:text-left">
              <Text size="sm" className="text-neutral-400">
                © {currentYear} {COMPANY.name}. All rights reserved.
              </Text>
              <div className="flex items-center justify-center space-x-4 md:justify-start">
                <Link
                  href="/privacy"
                  className="text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/compliance"
                  className="text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  Compliance
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {NAVIGATION.social.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-neutral-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
                  aria-label={`Follow us on ${social.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon === 'linkedin' && <LinkedinIcon size="sm" />}
                  {social.icon === 'twitter' && <TwitterIcon size="sm" />}
                  {social.icon === 'github' && <GithubIcon size="sm" />}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Compliance Disclaimer */}
      <div className="border-t border-neutral-800 bg-neutral-900">
        <Container size="xl" padding>
          <div className="py-4">
            <Text size="xs" className="text-center text-neutral-500 leading-relaxed">
              Investment products and services are offered through {COMPANY.name}. 
              Securities are subject to market risk, including potential loss of principal. 
              Past performance does not guarantee future results. All investments involve risk. 
              Please read all prospectuses carefully before investing.
            </Text>
          </div>
        </Container>
      </div>
    </footer>
  )
}

// Alternative footer variants
export const SimpleFooter = () => {
  return <Footer minimal={true} />
}

export const FullFooter = () => {
  return <Footer minimal={false} />
}

export default Footer