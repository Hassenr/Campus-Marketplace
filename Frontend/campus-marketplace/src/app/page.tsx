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
      <div
        style={{
        display: 'flex',
        gap: 12,
        overflowX: 'auto',
        paddingBottom: 8,
        scrollSnapType: 'x mandatory'
        }}
      >
        {[
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
        ].map((item) => (
        <article
          key={item.id}
          style={{
          flex: '0 0 300px',
          background: '#fff',
          borderRadius: 10,
          boxShadow: '0 6px 18px rgba(15,15,15,0.06)',
          padding: 12,
          scrollSnapAlign: 'start',
          border: '1px solid #f0f0f0'
          }}
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
          <p style={{ margin: 0, fontSize: 13, color: '#444' }}>{item.description}</p>
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
      </section>

      <footer style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #f2f2f2', color: '#666', fontSize: 14 }}>
      <p style={{ margin: '0 0 8px' }}>
        You are viewing as a guest. Create an account to post items, save favorites, and message sellers.
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
        onClick={() => window.location.href = '/signup'}
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
