import { AnimatedPage } from '@/components/AnimatedPage'
import TicketSummary from '@/pages/TicketSummary/TicketSummary'
import { Outlet, useLocation } from 'react-router-dom'
import { BookingStepper } from '@/components/booking/BookingStepper'
import '@/styles/booking-stitch.css'

// Per-page opt-in configuration (Rule B.1)
// Routes added here will be rendered with the new modern Stitch shell.
// Unmigrated routes render the exact legacy layout and styling.
const STITCH_OPT_IN_ROUTES: string[] = [
  // Routes will be added here as respective batches are implemented
  // e.g. '/purchase/seat' in Batch 2, '/purchase/food' in Batch 3, '/purchase/payment' in Batch 4
]

function PurchaseLayout() {
  const location = useLocation()
  const isStitched = STITCH_OPT_IN_ROUTES.includes(location.pathname)

  if (!isStitched) {
    // Exact legacy layout - 100% untouched for unmigrated routes
    return (
      <AnimatedPage>
        <section className="section-purchase mt-20">
          <div className="purchase-container container max-w-[132rem] md:px-16 xl:px-5">
            <div className="purchase-section-left">
              <div className="purchase-heading mt-20"></div>
              <Outlet />
            </div>

            <TicketSummary isStitched={false} />
          </div>
        </section>
      </AnimatedPage>
    )
  }

  // Modern Stitch Layout shell when opted in
  return (
    <AnimatedPage>
      <div className="booking-stitch min-h-screen bg-[#08080B] text-[#e4e1e7] pt-24 pb-16 selection:bg-[#E50914] selection:text-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <BookingStepper currentPath={location.pathname} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <main className="lg:col-span-8 w-full">
              <Outlet />
            </main>

            <aside className="lg:col-span-4 w-full">
              <TicketSummary isStitched={true} />
            </aside>
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}

export default PurchaseLayout
