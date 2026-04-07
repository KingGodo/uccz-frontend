"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowRight, CalendarDays, Eye, Heart, MapPin, MessageCircle, Share2, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type EventCategory =
  | "National"
  | "Conference"
  | "Regional"
  | "Greater"
  | "Local"

interface EventItem {
  id: string
  title: string
  description: string
  location: string
  organizer: string
  category: EventCategory
  tags: string[]
  startDate: string
  endDate: string
  time: string
  image: string
  views: number
  interested: number
  schedule: string[]
  comments: Array<{ name: string; role: string; date: string; text: string }>
}

const FILTER_CATEGORIES = [
  "All",
  "National",
  "Conference",
  "Regional",
  "Greater",
  "Local",
] as const

const EVENTS: EventItem[] = [
  {
    id: "national-conference-2026",
    title: "UCCZ National Conference 2026",
    description:
      "A three-day gathering of church leaders, youth groups, and ministry partners to celebrate worship, vision casting, and fellowship.",
    location: "Harare International Conference Centre",
    organizer: "UCCZ National Office",
    category: "National",
    tags: ["Conference", "Worship", "Leadership"],
    startDate: "2026-08-10",
    endDate: "2026-08-12",
    time: "9:00 AM – 5:00 PM",
    image:
      "https://www.uccz.org/img/slider/slider-01.jpg",
    views: 428,
    interested: 312,
    schedule: [
      "Opening worship and keynote session",
      "Breakout leadership workshops",
      "Evening concert and fellowship",
    ],
    comments: [
      {
        name: "Tendai Chikomo",
        role: "Youth Leader",
        date: "Apr 2, 2026",
        text: "This conference will be an important moment for regional unity and spiritual growth.",
      },
      {
        name: "Pastor Mercy",
        role: "Conference Host",
        date: "Apr 4, 2026",
        text: "We are preparing a strong prayer track and leadership roundtables for participants.",
      },
    ],
  },
  {
    id: "greater-prayer-gathering",
    title: "Greater Prayer Gathering",
    description:
      "An evening of collective prayer, scripture reflection, and a renewed focus on community outreach for the Greater region.",
    location: "Bulawayo City Hall",
    organizer: "Greater UCCZ Region",
    category: "Greater",
    tags: ["Prayer", "Community", "Healing"],
    startDate: "2026-07-04",
    endDate: "2026-07-04",
    time: "4:30 PM – 8:30 PM",
    image:
      "https://www.uccz.org/img/councils/gazaland-03.jpg",
    views: 219,
    interested: 188,
    schedule: [
      "Welcome and opening worship",
      "Prayer stations and small group ministry",
      "Closing blessing and fellowship time",
    ],
    comments: [
      {
        name: "Simba Ndlovu",
        role: "Member",
        date: "Apr 5, 2026",
        text: "I appreciate the strong focus on healing and community prayer in this event.",
      },
    ],
  },
  {
    id: "regional-leadership-summit",
    title: "Regional Leadership Summit",
    description:
      "Regional pastors and ministry coordinators gather to plan the next church year, training resources, and grassroots outreach programs.",
    location: "Mutare Conference Centre",
    organizer: "Eastern Regional Council",
    category: "Regional",
    tags: ["Leadership", "Planning", "Training"],
    startDate: "2026-06-15",
    endDate: "2026-06-15",
    time: "10:00 AM – 4:00 PM",
    image:
      "https://www.uccz.org/img/gu/gu-media.jpg",
    views: 185,
    interested: 143,
    schedule: [
      "Opening remarks and strategic vision",
      "Regional workshops and planning sessions",
      "Closing reflection and prayer commissioning",
    ],
    comments: [
      {
        name: "Brian Mukarati",
        role: "Regional Pastor",
        date: "Apr 7, 2026",
        text: "This summit is a vital opportunity to align our regional outreach for the year ahead.",
      },
    ],
  },
  {
    id: "local-youth-workshop",
    title: "Local Youth Workshop",
    description:
      "A hands-on workshop for local youth groups offering discipleship training, music ministry coaching, and leadership mentorship.",
    location: "Chitungwiza Fellowship Hall",
    organizer: "UCCZ Local Ministry",
    category: "Local",
    tags: ["Youth", "Workshop", "Music"],
    startDate: "2026-05-20",
    endDate: "2026-05-20",
    time: "1:00 PM – 6:00 PM",
    image:
      "https://www.uccz.org/img/ukama/3.jpg",
    views: 148,
    interested: 97,
    schedule: [
      "Group worship and creative worship lab",
      "Mentorship sessions with youth leaders",
      "Open mic testimony sharing",
    ],
    comments: [
      {
        name: "Anesu Kambarami",
        role: "Youth Member",
        date: "Apr 1, 2026",
        text: "Excited to connect with other youth groups and build stronger leadership skills.",
      },
    ],
  },
  {
    id: "conference-planning-day",
    title: "Conference Planning Day",
    description:
      "A practical planning session for Conference teams to prepare yearly events, budgets, and volunteer deployment strategies.",
    location: "Harare Central Church",
    organizer: "Conference Planning Committee",
    category: "Conference",
    tags: ["Planning", "Budget", "Volunteer"],
    startDate: "2026-09-01",
    endDate: "2026-09-01",
    time: "8:30 AM – 3:30 PM",
    image:
      "https://www.uccz.org/img/slider/slider-01.jpg",
    views: 92,
    interested: 64,
    schedule: [
      "Budget review and approval",
      "Volunteer recruitment strategy",
      "Conference timeline and action planning",
    ],
    comments: [
      {
        name: "Rudo Nyamukondiwa",
        role: "Treasury Team",
        date: "Apr 6, 2026",
        text: "This workshop is essential for making our future conferences more sustainable.",
      },
    ],
  },
]

const formatDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }

  if (startDate === endDate) {
    return start.toLocaleDateString("en-US", options)
  }

  return `${start.toLocaleDateString("en-US", options)} — ${end.toLocaleDateString(
    "en-US",
    options
  )}`
}

const getDaysLeft = (endDate: string) => {
  const end = new Date(endDate)
  const now = new Date()
  const diff = end.getTime() - now.getTime()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  return days > 0 ? days : 0
}

const getShareText = (event: EventItem, currentUrl: string) =>
  encodeURIComponent(
    `Discover ${event.title} at ${event.location}. Learn more: ${currentUrl}`
  )

function EventCard({
  event,
  onOpen,
  onShare,
}: {
  event: EventItem
  onOpen: (event: EventItem) => void
  onShare: (event: EventItem) => void
}) {
  const daysLeft = getDaysLeft(event.endDate)

  return (
    <article className="event-card group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_70px_rgba(54,69,99,0.12)]">
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-x-5 top-5 flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-slate-950/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white shadow-lg">
            {daysLeft} days left
          </span>
          <Badge className="bg-white/90 text-slate-900 shadow-sm" variant="secondary">
            {event.category}
          </Badge>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <Badge key={tag} className="bg-slate-100 text-slate-700 border-slate-200" variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="space-y-3">
          <h2
            className="text-[19px] font-bold text-slate-950 leading-tight"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            {event.title}
          </h2>

          <p
            className="text-sm leading-7 text-slate-600"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {event.description}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-slate-600">
              <CalendarDays size={16} aria-hidden="true" />
              <span className="text-[13px] font-medium">{formatDateRange(event.startDate, event.endDate)}</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-slate-600">
              <MapPin size={16} aria-hidden="true" />
              <span className="text-[13px]">{event.location}</span>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-slate-600">
              <Users size={16} aria-hidden="true" />
              <span className="text-[13px]">Hosted by {event.organizer}</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-slate-600">
              <MessageCircle size={16} aria-hidden="true" />
              <span className="text-[13px]">{event.time}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-slate-500">
          <div className="flex flex-wrap items-center gap-4 text-[13px]">
            <span className="inline-flex items-center gap-2">
              <Eye size={15} aria-hidden="true" />
              {event.views}
            </span>
            <span className="inline-flex items-center gap-2">
              <Heart size={15} aria-hidden="true" />
              {event.interested}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onShare(event)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[13px] font-semibold text-slate-700 transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-primary/40"
              aria-label={`Share ${event.title}`}
            >
              <Share2 size={16} /> Share
            </button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onOpen(event)}
              aria-label={`Read more about ${event.title}`}
            >
              Read More
              <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function EventsPage() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<typeof FILTER_CATEGORIES[number]>("All")
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [shareUrl, setShareUrl] = useState("")

  useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  const upcomingEvents = useMemo(
    () =>
      EVENTS.filter((event) => {
        const end = new Date(event.endDate)
        return end >= new Date()
      }),
    []
  )

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return upcomingEvents
      .filter((event) =>
        activeCategory === "All" ? true : event.category === activeCategory
      )
      .filter((event) => {
        if (!normalizedQuery) {
          return true
        }

        return [
          event.title,
          event.category,
          event.location,
          event.organizer,
          ...event.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)
      })
  }, [activeCategory, upcomingEvents, query])

  const handleShare = (event: EventItem) => {
    const shareText = `Discover ${event.title} at ${event.location}.`;
    const shareLink = `${shareUrl}#${event.id}`

    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: shareText,
        url: shareLink,
      })
      return
    }

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`,
      "_blank",
      "noopener,noreferrer"
    )
  }

  return (
    <main className="bg-slate-50 text-slate-950 min-h-screen">
      <section className="border-b border-slate-200 bg-white/90 py-14 shadow-sm shadow-slate-200/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.28em] font-semibold text-slate-500" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Events
            </p>
            <h1
              id="events-heading"
              className="mt-3 text-[32px] md:text-[44px] font-bold tracking-[-0.02em] text-slate-950"
              style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            >
              Upcoming UCCZ Events
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Browse live church gatherings, regional workshops, and conferences. Use search and filters for real-time event discovery.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="event-search" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Search events
              </label>
              <Input
                id="event-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name, category, location, or tag"
                aria-label="Search events"
                className="w-full rounded-3xl border-slate-300 bg-white shadow-sm"
              />
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    Filter by category
                  </p>
                  <p className="text-sm text-slate-500" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    Choose a category for instant results.
                  </p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-slate-700 shadow-sm">
                  {filteredEvents.length} live
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {FILTER_CATEGORIES.map((filter) => (
                  <Button
                    key={filter}
                    variant={filter === activeCategory ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(filter)}
                    className="w-full justify-center"
                    aria-pressed={filter === activeCategory}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {filteredEvents.length === 0 ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-12 text-center shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              No events found
            </p>
            <h2 className="mt-4 text-2xl font-bold text-slate-900" style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>
              Try a different search or filter.
            </h2>
            <p className="mt-3 text-slate-600" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              The event calendar updates automatically and only shows upcoming activities.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onOpen={(item) => setSelectedEvent(item)}
                onShare={handleShare}
              />
            ))}
          </div>
        )}
      </section>

      {selectedEvent && (
        <section className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl rounded-[2rem] bg-white shadow-[0_32px_90px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/80 overflow-hidden">
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="lg:w-[45%]">
                <div className="relative h-72 sm:h-96 lg:h-full overflow-hidden">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              <div className="lg:w-[55%] p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 text-sm sm:text-base">
                    <span className="rounded-full bg-primary px-4 py-2 text-white font-semibold uppercase tracking-[0.24em]" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      {selectedEvent.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedEvent(null)}
                      className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-slate-700 font-semibold transition hover:bg-slate-200"
                    >
                      Back to events
                    </button>
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold tracking-[-0.03em] text-slate-950" style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>
                      {selectedEvent.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      {selectedEvent.description}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                      <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-slate-500" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                        Date & time
                      </p>
                      <p className="mt-2 text-sm text-slate-600">{formatDateRange(selectedEvent.startDate, selectedEvent.endDate)}</p>
                      <p className="mt-1 text-sm text-slate-600">{selectedEvent.time}</p>
                    </div>
                    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                      <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-slate-500" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                        Location & organizer
                      </p>
                      <p className="mt-2 text-sm text-slate-600">{selectedEvent.location}</p>
                      <p className="mt-1 text-sm text-slate-600">Organized by {selectedEvent.organizer}</p>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-slate-500" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      Event schedule
                    </p>
                    <ul className="mt-4 space-y-3 text-sm text-slate-600" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      {selectedEvent.schedule.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-slate-500" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      Community comments
                    </p>
                    <div className="mt-4 space-y-4">
                      {selectedEvent.comments.map((comment) => (
                        <div key={`${comment.name}-${comment.date}`} className="rounded-3xl bg-white p-4 shadow-sm">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{comment.name}</p>
                              <p className="text-[13px] text-slate-500">{comment.role} • {comment.date}</p>
                            </div>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-700">
                              Review
                            </span>
                          </div>
                          <p className="mt-3 text-sm leading-7 text-slate-600">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <form className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm" aria-label="Leave a comment">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-slate-500" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      Add your expectation
                    </p>
                    <div className="mt-4 space-y-4">
                      <label className="sr-only" htmlFor="comment-input">
                        Comment
                      </label>
                      <textarea
                        id="comment-input"
                        rows={4}
                        placeholder="Share your prayer request, expectation, or encouragement"
                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                      <Button type="button" variant="default" size="sm">
                        Add comment
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
