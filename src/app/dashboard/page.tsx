'use client';

import { useState } from 'react';

export default function DashboardPage() {
    const [input, setInput] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input }),
        });

        const data = await res.json();
        console.log('API response:', data);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">AI Risk Scanner</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe your AI system here..."
        rows={8}
        className="w-full p-4 border border-gray-300 rounded text-black"
        required
        />
        <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
        Scan for Compliance Risks
        </button>
        </form>
        </div>
    );
}
