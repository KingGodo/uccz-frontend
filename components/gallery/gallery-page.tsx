"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type GalleryCategory = "National" | "Conference" | "Regional" | "Greater" | "Local"

interface GalleryItem {
  id: string
  title: string
  category: GalleryCategory
  src: string
  alt: string
}

const FILTERS: Array<GalleryCategory | "All"> = [
  "All",
  "National",
  "Conference",
  "Regional",
  "Greater",
  "Local",
]

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "hatcliff-event",
    title: "Synod Officers Workshop",
    category: "National",
    src: "https://www.uccz.org/img/councils/hatcliff-event-02.jpg",
    alt: "UCCZ Synod officers workshop at Hatcliff event",
  },
  {
    id: "aacc-inauguration",
    title: "Harare West Conference",
    category: "Conference",
    src: "https://www.uccz.org/img/councils/aacc-01.jpg",
    alt: "Harare West conference inauguration event",
  },
  {
    id: "byo-city-meeting",
    title: "Presidium Meeting",
    category: "Regional",
    src: "https://www.uccz.org/img/councils/byo-city.jpg",
    alt: "UCCZ presidium meeting in Bulawayo",
  },
  {
    id: "cyf-agm",
    title: "CYF Annual Gathering",
    category: "Greater",
    src: "https://www.uccz.org/img/councils/cyf-agm.jpg",
    alt: "Christian Youth Fellowship AGM in UCCZ",
  },
  {
    id: "ruwadzano-national",
    title: "Ruwadzano AGM",
    category: "Local",
    src: "https://www.uccz.org/img/councils/ruwadzano-01.jpg",
    alt: "Ruwadzano national AGM gathering",
  },
  {
    id: "volunteers-01",
    title: "UCCZ Volunteers",
    category: "Local",
    src: "https://www.uccz.org/img/councils/volunteers-01.jpg",
    alt: "UCCZ volunteers working together",
  },
  {
    id: "volunteers-02",
    title: "Community Service",
    category: "Greater",
    src: "https://www.uccz.org/img/councils/volunteers-02.jpg",
    alt: "Community service by UCCZ volunteers",
  },
  {
    id: "men-fellowship",
    title: "Men's Fellowship",
    category: "Conference",
    src: "https://www.uccz.org/img/councils/men-fellowship-03.jpg",
    alt: "Christian men's fellowship gathering",
  },
]

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<typeof FILTERS[number]>("All")
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const filteredItems = useMemo(
    () =>
      activeFilter === "All"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === activeFilter),
    [activeFilter]
  )

  useEffect(() => {
    if (selectedIndex === null) {
      document.body.style.overflow = ""
      return
    }

    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedIndex])

  useEffect(() => {
    if (selectedIndex === null) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null)
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) => {
          if (current === null) return null
          return (current - 1 + filteredItems.length) % filteredItems.length
        })
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex((current) => {
          if (current === null) return null
          return (current + 1) % filteredItems.length
        })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [filteredItems.length, selectedIndex])

  const openLightbox = (index: number) => setSelectedIndex(index)
  const closeLightbox = () => setSelectedIndex(null)

  const showPrevious = () => {
    setSelectedIndex((current) => {
      if (current === null) return null
      return (current - 1 + filteredItems.length) % filteredItems.length
    })
  }

  const showNext = () => {
    setSelectedIndex((current) => {
      if (current === null) return null
      return (current + 1) % filteredItems.length
    })
  }

  const selectedItem = selectedIndex === null ? null : filteredItems[selectedIndex]

  return (
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p
              className="text-[11px] uppercase tracking-[0.25em] font-semibold text-slate-500"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Church Gallery
            </p>
            <h1
              className="mt-4 text-[32px] md:text-[40px] font-bold tracking-[-0.02em] text-slate-950"
              style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            >
              Visual stories from UCCZ congregations
            </h1>
            <p
              className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-500"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              A clean, image-first gallery with council filters and an immersive
              lightbox experience.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {FILTERS.map((filter) => (
              <Button
                key={filter}
                type="button"
                variant={filter === activeFilter ? "secondary" : "outline"}
                size="sm"
                onClick={() => {
                  setActiveFilter(filter)
                  setSelectedIndex(null)
                }}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openLightbox(index)}
              className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_60px_rgba(15,23,42,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-slate-950/0 transition duration-300 group-hover:bg-slate-950/20" />

              <div className="absolute inset-x-4 bottom-4 rounded-3xl bg-white/90 p-3 shadow-sm backdrop-blur-sm transition duration-300 group-hover:translate-y-0.5">
                <p
                  className="text-[11px] uppercase tracking-[0.22em] text-slate-500"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {item.category}
                </p>
                <h2
                  className="mt-2 text-[15px] font-semibold text-slate-950 leading-tight"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {item.title}
                </h2>
              </div>
            </button>
          ))}
        </div>
      </section>

      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 px-4 py-6 backdrop-blur-sm"
        >
          <div
            className="absolute inset-0"
            aria-hidden="true"
            onClick={closeLightbox}
          />

          <div className="relative mx-auto w-full max-w-[95vw] max-h-[95vh] overflow-hidden rounded-[2rem] bg-slate-950 shadow-[0_30px_120px_rgba(15,23,42,0.45)]">
            <button
              type="button"
              aria-label="Close gallery"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-slate-950 shadow-sm transition hover:bg-white"
            >
              <X size={18} />
            </button>

            <button
              type="button"
              aria-label="Previous image"
              onClick={showPrevious}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/95 p-3 shadow-sm transition hover:bg-white"
            >
              <ArrowLeft size={20} />
            </button>

            <button
              type="button"
              aria-label="Next image"
              onClick={showNext}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/95 p-3 shadow-sm transition hover:bg-white"
            >
              <ArrowRight size={20} />
            </button>

            <img
              src={selectedItem.src}
              alt={selectedItem.alt}
              className="h-[80vh] w-full object-contain bg-slate-950"
            />

            <div className="absolute bottom-0 left-0 right-0 rounded-b-[2rem] bg-slate-950/85 p-6 text-white backdrop-blur-md">
              <p
                className="text-[11px] uppercase tracking-[0.25em] text-slate-300"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {selectedItem.category}
              </p>
              <h2
                className="mt-2 text-[22px] font-semibold leading-tight"
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                {selectedItem.title}
              </h2>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
