import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Atelier" },
      { name: "description", content: "Get in touch with Atelier — we're here to help with styling questions, orders, and product inquiries." },
      { property: "og:title", content: "Contact — Atelier" },
      { property: "og:description", content: "Reach our styling team for personalized assistance." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="w-full px-6 py-20 xl:px-10">
      {/* Hero */}
      <div className="mb-12 max-w-3xl">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Get in touch</div>
        <h1 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">
          We're here to help
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have questions about sizing, styling, or our collection? Our team is ready to assist.
          Send us a message and we'll respond within 24 hours.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="surface-card p-8">
            <h2 className="mb-6 font-display text-2xl">Contact information</h2>
            <div className="space-y-5 text-sm">
              <a href="mailto:hello@atelier.com" className="flex items-start gap-4 text-ink transition-colors hover:text-terracotta">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
                <div>
                  <div className="font-medium text-base">Email us</div>
                  <div className="mt-1 text-muted-foreground">hello@atelier.com</div>
                  <div className="mt-1 text-xs text-muted-foreground">We respond within 24 hours</div>
                </div>
              </a>
              <a href="tel:+15551234567" className="flex items-start gap-4 text-ink transition-colors hover:text-terracotta">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
                <div>
                  <div className="font-medium text-base">Call us</div>
                  <div className="mt-1 text-muted-foreground">+1 (555) 123-4567</div>
                  <div className="mt-1 text-xs text-muted-foreground">Available during business hours</div>
                </div>
              </a>
              <div className="flex items-start gap-4 text-ink">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
                <div>
                  <div className="font-medium text-base">Business hours</div>
                  <div className="mt-1 text-muted-foreground">Monday - Friday: 9am - 6pm EST</div>
                  <div className="text-muted-foreground">Saturday: 10am - 4pm EST</div>
                  <div className="mt-1 text-xs text-muted-foreground">Closed Sundays</div>
                </div>
              </div>
              <div className="flex items-start gap-4 text-ink">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
                <div>
                  <div className="font-medium text-base">Headquarters</div>
                  <div className="mt-1 text-muted-foreground">New York, NY</div>
                  <div className="mt-1 text-xs text-muted-foreground">Serving customers worldwide</div>
                </div>
              </div>
            </div>
          </div>

          <div className="surface-card p-8">
            <div className="flex items-start gap-4">
              <MessageCircle className="mt-1 h-6 w-6 shrink-0 text-terracotta" />
              <div>
                <h3 className="font-display text-xl">Need styling advice?</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Book a personal consultation with our styling team. We'll help you build
                  a wardrobe that works for your lifestyle and aesthetic.
                </p>
                <button className="btn-primary mt-5 text-sm">Book consultation</button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form 
          className="surface-card space-y-6 p-8 lg:p-10" 
          onSubmit={(e) => { 
            e.preventDefault(); 
            alert("Thanks for reaching out! We'll get back to you within 24 hours."); 
          }}
        >
          <h2 className="font-display text-2xl">Send us a message</h2>
          
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="name">
                Name <span className="text-terracotta">*</span>
              </label>
              <input 
                id="name" 
                placeholder="John Doe" 
                className="field h-12 w-full px-4" 
                required 
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="email">
                Email <span className="text-terracotta">*</span>
              </label>
              <input 
                id="email" 
                type="email" 
                placeholder="john@example.com" 
                className="field h-12 w-full px-4" 
                required 
              />
            </div>
          </div>
          
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="phone">
                Phone
              </label>
              <input 
                id="phone" 
                type="tel" 
                placeholder="+1 (555) 123-4567" 
                className="field h-12 w-full px-4" 
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="subject">
                Subject <span className="text-terracotta">*</span>
              </label>
              <input 
                id="subject" 
                placeholder="How can we help?" 
                className="field h-12 w-full px-4" 
                required 
              />
            </div>
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="message">
              Message <span className="text-terracotta">*</span>
            </label>
            <textarea 
              id="message" 
              placeholder="Tell us more about your inquiry. Whether you're looking for styling advice, have questions about our products, or need assistance with an order — we're here to help." 
              className="field min-h-[200px] w-full resize-y px-4 py-4 leading-relaxed" 
              required 
            />
          </div>
          
          <button type="submit" className="btn-primary h-12 w-full text-base font-medium">
            Send message
          </button>
          
          <p className="text-center text-sm text-muted-foreground">
            We typically respond within 24 hours during business days.
          </p>
        </form>
      </div>

      {/* FAQ */}
      <div className="mt-24">
        <div className="mb-10 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Common questions</div>
          <h2 className="mt-2 font-display text-4xl">Quick answers</h2>
          <p className="mt-3 text-muted-foreground">
            Find answers to frequently asked questions. Can't find what you're looking for? Send us a message.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { q: "Shipping & Delivery", a: "We offer worldwide shipping with full tracking. Most orders arrive within 5-7 business days. Express shipping available." },
            { q: "Returns & Exchanges", a: "30-day return policy on all items. Free exchanges for sizing adjustments. Items must be unworn with tags attached." },
            { q: "Sizing Help", a: "Detailed size guides available on all product pages. Contact us for personalized fit advice from our styling team." },
            { q: "Personal Styling", a: "Book a free consultation with our styling team to build your perfect wardrobe. Virtual and in-person sessions available." },
            { q: "Authentication", a: "All luxury items are verified for authenticity by our expert team. Each piece comes with authentication documentation." },
            { q: "Alterations", a: "Professional tailoring services available for the perfect fit on any piece. In-house alterations or partner tailors." },
          ].map((faq) => (
            <div key={faq.q} className="surface-card p-6 transition-transform hover:-translate-y-1">
              <h3 className="font-display text-lg">{faq.q}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
