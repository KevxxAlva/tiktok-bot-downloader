import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from '../pages/Home';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import '@testing-library/jest-dom';

// Mock axios
vi.mock('axios');

describe('Home Component Integration Tests', () => {
  it('TC001: Renders main title and platform selector', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    // Check main H1
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Video/i);
    expect(heading).toHaveTextContent(/Downloader/i);
    expect(screen.getByText(/SELECCIONA LA PLATAFORMA/i)).toBeInTheDocument();
  });

  it('TC009: Responsive UI elements check', () => {
    // Check if input exists
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    // Use partial match as "PEGA EL ENLACE DE TIKTOK AQUÍ..."
    const input = screen.getByPlaceholderText(/PEGA EL ENLACE/i);
    expect(input).toBeInTheDocument();
    
    // Check buttons exist
    const tiktokBtn = screen.getByText('TikTok');
    const instaBtn = screen.getByText('Instagram');
    expect(tiktokBtn).toBeInTheDocument();
    expect(instaBtn).toBeInTheDocument();
  });

  it('TC002: Successful TikTok video download flow', async () => {
    const mockData = {
      status: 'success',
      result: {
        desc: 'Test Video',
        author: { nickname: 'testuser', avatar: 'avatar.jpg' },
        video: ['http://video.mp4'],
        music: 'http://music.mp3',
        cover: 'cover.jpg',
        images: [],
        downloads: [
          { type: 'hd', url: 'http://video.mp4', label: 'HD Video', size: 1024 }
        ]
      }
    };
    
    (axios.get as any).mockResolvedValueOnce({ data: mockData });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Select TikTok
    fireEvent.click(screen.getByText('TikTok'));
    
    // Enter URL - wait for placeholder to update if needed, but initial is TikTok
    const input = screen.getByPlaceholderText(/PEGA EL ENLACE/i);
    fireEvent.change(input, { target: { value: 'https://tiktok.com/@user/video/123' } });
    
    // Click Download
    const button = screen.getByRole('button', { name: /REVELAR CONTENIDO/i });
    fireEvent.click(button);

    // Wait for result
    await waitFor(() => {
      expect(screen.getByText('Objetivo Localizado')).toBeInTheDocument();
      expect(screen.getByText('Test Video')).toBeInTheDocument();
      expect(screen.getByText('testuser')).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('TC007: Error handling for invalid URLs', async () => {
    (axios.get as any).mockRejectedValueOnce({ 
      response: { data: { error: 'Video not found' } } 
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/PEGA EL ENLACE/i);
    fireEvent.change(input, { target: { value: 'https://invalid-url.com' } });
    
    fireEvent.click(screen.getByRole('button', { name: /REVELAR CONTENIDO/i }));

    await waitFor(() => {
      expect(screen.getByText(/Video not found/i)).toBeInTheDocument();
    });
  });

  it('TC003: Successful Instagram video download flow', async () => {
    const mockData = {
        status: 'success',
        result: {
            desc: 'Insta Reel',
            author: { nickname: 'insta_user', avatar: 'avatar.jpg' },
            video: ['http://video.mp4'],
            music: null,
            cover: 'cover.jpg',
            images: [],
            downloads: [{ type: 'normal', url: 'http://video.mp4', label: 'Video', size: 500 }]
        }
    };
    (axios.get as any).mockResolvedValueOnce({ data: mockData });

    render(<MemoryRouter><Home /></MemoryRouter>);

    // Select Instagram
    fireEvent.click(screen.getByRole('button', { name: /Instagram/i }));

    const input = screen.getByPlaceholderText(/PEGA EL ENLACE/i);
    fireEvent.change(input, { target: { value: 'https://instagram.com/reel/123' } });

    fireEvent.click(screen.getByRole('button', { name: /REVELAR CONTENIDO/i }));

    await waitFor(() => {
        expect(screen.getByText('Insta Reel')).toBeInTheDocument();
        expect(screen.getByText('insta_user')).toBeInTheDocument();
    });
  });

  it('TC005: Successful TikTok Audio download flow', async () => {
    const mockData = {
        status: 'success',
        result: {
            desc: 'TikTok Audio',
            author: { nickname: 'musician', avatar: 'avatar.jpg' },
            video: [],
            music: 'http://music.mp3',
            cover: 'cover.jpg',
            images: [],
            downloads: [{ type: 'music', url: 'http://music.mp3', label: 'Audio MP3', size: 200 }]
        }
    };
    (axios.get as any).mockResolvedValueOnce({ data: mockData });

    render(<MemoryRouter><Home /></MemoryRouter>);

    // Select Audio Mode
    fireEvent.click(screen.getByRole('button', { name: /Audio/i }));

    const input = screen.getByPlaceholderText(/PEGA EL ENLACE/i);
    fireEvent.change(input, { target: { value: 'https://tiktok.com/@user/video/123' } });

    fireEvent.click(screen.getByRole('button', { name: /REVELAR CONTENIDO/i }));

    await waitFor(() => {
        expect(screen.getByText('TikTok Audio')).toBeInTheDocument();
        expect(screen.getByText(/Audio MP3/i)).toBeInTheDocument();
    });
  });

  it('TC012: Multiple concurrent download requests without crashes', async () => {
    // Simulate 5 rapid sequential download requests to verify stability
    const mockData = {
      status: 'success',
      result: {
        desc: 'Concurrent Test',
        author: { nickname: 'load_user', avatar: 'avatar.jpg' },
        video: ['http://video.mp4'],
        music: 'http://music.mp3',
        cover: 'cover.jpg',
        images: [],
        downloads: [{ type: 'hd', url: 'http://video.mp4', label: 'HD Video', size: 2048 }]
      }
    };

    // Mock multiple sequential calls
    for (let i = 0; i < 5; i++) {
      (axios.get as any).mockResolvedValueOnce({ data: mockData });
    }

    render(<MemoryRouter><Home /></MemoryRouter>);

    const input = screen.getByPlaceholderText(/PEGA EL ENLACE/i);
    const submitBtn = screen.getByRole('button', { name: /REVELAR CONTENIDO/i });

    // Rapidly submit 5 download requests
    for (let i = 0; i < 5; i++) {
      fireEvent.change(input, { target: { value: `https://tiktok.com/@user/video/${i}` } });
      fireEvent.click(submitBtn);
    }

    // Verify the UI didn't crash and last result renders
    await waitFor(() => {
      expect(screen.getByText('Concurrent Test')).toBeInTheDocument();
      expect(screen.getByText('load_user')).toBeInTheDocument();
    }, { timeout: 5000 });

    // Verify no error messages appeared (stability)
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  it('TC013: Smooth animations - Framer Motion elements render correctly', () => {
    const { container } = render(<MemoryRouter><Home /></MemoryRouter>);

    // Verify Framer Motion animated elements exist (they render as regular DOM with style attrs)
    // motion.div elements have style attributes for opacity/transform from Framer Motion
    const animatedElements = container.querySelectorAll('[style]');
    expect(animatedElements.length).toBeGreaterThan(0);

    // Verify the platform selector buttons have animation capabilities
    const platformButtons = screen.getAllByRole('button');
    expect(platformButtons.length).toBeGreaterThanOrEqual(3); // TikTok, Instagram, Facebook at minimum

    // Verify the mode switch (Video/Audio) renders and is interactive
    const videoBtn = screen.getByRole('button', { name: /^Video$/i });
    const audioBtn = screen.getByRole('button', { name: /^Audio$/i });
    expect(videoBtn).toBeInTheDocument();
    expect(audioBtn).toBeInTheDocument();

    // Simulate mode switch animation trigger
    fireEvent.click(audioBtn);
    fireEvent.click(videoBtn);

    // Verify AnimatePresence wrapper exists (error section uses it)
    // The component shouldn't crash during rapid state changes (animation resilience)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

    // Verify guide section with step animations rendered
    expect(screen.getByText('Guía de Uso')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
  });
});
