import { HeroSection } from '@/components/marketing/hero-section'
import { TrustStrip } from '@/components/marketing/trust-strip'
import { GalleryStrip } from '@/components/marketing/gallery-strip'
import { StatsSection } from '@/components/marketing/stats-section'
import { QuickActionsSection } from '@/components/marketing/quick-actions-section'
import { TrackSection } from '@/components/marketing/track-section'
import { ServicesSection } from '@/components/marketing/services-section'
import { OneStopSection } from '@/components/marketing/one-stop-section'
import { RoutesSection } from '@/components/marketing/routes-section'
import { WhySection } from '@/components/marketing/why-section'
import { ContactSection } from '@/components/marketing/contact-section'
import { SiteFooter } from '@/components/site-footer'

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#05080c]">
      <HeroSection />
      <TrustStrip />
      <GalleryStrip />
      <StatsSection />
      <QuickActionsSection />
      <TrackSection />
      <ServicesSection />
      <OneStopSection />
      <RoutesSection />
      <WhySection />
      <ContactSection />
      <SiteFooter />
    </div>
  )
}
