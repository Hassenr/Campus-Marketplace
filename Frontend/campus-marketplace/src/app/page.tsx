'use client';

import React from 'react';

export default function Home() {
  return (
    <div style={{ padding: 24, fontFamily: 'Inter, system-ui, sans-serif', color: '#111' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <p style={{ margin: '6px 0 0', color: '#555' }}>Browse items posted by other students — no account required to view listings.</p>
      </header>

      <section aria-label="Listings" style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: 18, margin: '0 0 8px' }}>Trending listings</h2>
      <div style={{ overflow: 'hidden', paddingBottom: 8 }}>
        <style>{`
          /* adjustable speed (seconds) */
          :root { --scroll-duration: 36s; }

          .auto-scroll-viewport { overflow: hidden; }
          .auto-scroll-track {
        display: inline-flex;           /* keep items in one row */
        gap: 12px;
        align-items: flex-start;
        width: max-content;             /* shrink to content so translateX(-50%) is correct */
        will-change: transform;
        animation: scroll var(--scroll-duration) linear infinite;
          }

          /* Pause when user hovers or focuses (accessibility) */
          .auto-scroll-viewport:hover .auto-scroll-track,
          .auto-scroll-viewport:focus-within .auto-scroll-track {
        animation-play-state: paused;
          }

          /* seamless loop moves exactly half (the duplicated set) */
          @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
          }

          /* hide scrollbar if any */
          .auto-scroll-track::-webkit-scrollbar { display: none; }

          /* respect reduced motion preference */
          @media (prefers-reduced-motion: reduce) {
        .auto-scroll-track { animation: none; }
          }
        `}</style>

        {(() => {
          const items = [
        {
          id: 1,
          title: 'Intro to Algorithms (3rd Ed.)',
          price: '$35',
          location: 'Main Library Pickup',
          condition: 'Good',
          description: 'Well-kept copy, highlighted in some chapters.',
          image: 'https://via.placeholder.com/400x260?text=Algorithms+Book'
        },
        {
          id: 2,
          title: 'Campus Bike - Hybrid',
          price: '$120',
          location: 'East Dorm',
          condition: 'Used',
          description: 'Reliable commuter bike, new tires last month.',
          image: 'https://via.placeholder.com/400x260?text=Campus+Bike'
        },
        {
          id: 3,
          title: 'Dorm Mini Fridge',
          price: '$40',
          location: 'North Housing',
          condition: 'Fair',
          description: 'Works well, small dent on top.',
          image: 'https://via.placeholder.com/400x260?text=Mini+Fridge'
        },
        {
          id: 4,
          title: 'Guitar (Acoustic)',
          price: '$80',
          location: 'Music Building',
          condition: 'Very Good',
          description: 'Fender-style acoustic, great for beginners.',
          image: 'https://via.placeholder.com/400x260?text=Acoustic+Guitar'
        },
        {
          id: 5,
          title: 'Calculus Notes (Spring)',
          price: 'Free',
          location: 'Student Center',
          condition: 'Like New',
          description: 'Comprehensive typed notes and worked problems.',
          image: 'https://via.placeholder.com/400x260?text=Calculus+Notes'
        }
          ];

          // Duplicate the list so the animation can scroll seamlessly and wrap back
          const loopItems = [...items, ...items];

          return (
        <div className="auto-scroll-viewport" aria-hidden="false">
          <div className="auto-scroll-track" role="list">
            {loopItems.map((item, idx) => (
          <article
            key={`${item.id}-${idx}`}
            style={{
              flex: '0 0 300px',
              background: '#fff',
              borderRadius: 10,
              boxShadow: '0 6px 18px rgba(15,15,15,0.06)',
              padding: 12,
              border: '1px solid #f0f0f0',
              scrollSnapAlign: 'start'
            }}
            role="listitem"
            aria-hidden={idx >= items.length} /* hide duplicated items from assistive tech */
          >
            <div
              style={{
            height: 170,
            borderRadius: 8,
            backgroundImage: `url(${item.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            marginBottom: 10
              }}
              role="img"
              aria-label={item.title}
            />
            <h3 style={{ margin: '0 0 6px', fontSize: 16 }}>{item.title}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <strong style={{ color: '#0a0' }}>{item.price}</strong>
              <span style={{ fontSize: 12, color: '#666' }}>{item.location}</span>
            </div>
            <p
              title={item.description}
              style={{
            margin: 0,
            fontSize: 13,
            color: '#444',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
              }}
            >
              {item.description}
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button
            onClick={() => alert('Please sign up to message sellers')}
            style={{ flex: 1, padding: '8px 10px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
              >
            View details
              </button>
              <button
            onClick={() => alert('Please sign up to message sellers')}
            style={{ padding: '8px 10px', background: 'transparent', border: '1px solid #d0d0d0', borderRadius: 6, cursor: 'pointer' }}
              >
            Message
              </button>
            </div>
          </article>
            ))}
          </div>
        </div>
          );
        })()}
      </div>
      </section>

      <footer style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #f2f2f2', color: '#666', fontSize: 14 }}>
      <p style={{ margin: '0 0 8px' }}>
        You are viewing as a guest. Create an account to post items, save favorites, and message sellers.
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
        onClick={() => window.location.href = '/signin'}
        style={{ background: '#0b67ff', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 6, cursor: 'pointer' }}
        >
        Create account
        </button>
        <button
        onClick={() => window.location.href = '/browse'}
        style={{ background: 'transparent', border: '1px solid #d0d0d0', padding: '8px 12px', borderRadius: 6, cursor: 'pointer' }}
        >
        Browse more
        </button>
      </div>
      </footer>
    </div>
  );
}
