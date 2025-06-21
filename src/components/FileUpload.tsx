// src/components/FileUpload.tsx

'use client';

import { useRef } from 'react';
import { parseFile, ParsedFile } from '@/lib/parseFile';

interface Props {
    onFileParsed: (data: ParsedFile, fileName: string) => void;
}

export default function FileUpload({ onFileParsed }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const parsed = await parseFile(file);
            onFileParsed(parsed, file.name);
        } catch (err) {
            alert('Failed to parse file: ' + (err as Error).message);
        }
    };

    return (
        <div className="border-dashed border-2 border-gray-300 p-4 rounded-lg text-center">
        <input
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={handleFile}
        className="hidden"
        ref={inputRef}
        />
        <button
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        onClick={() => inputRef.current?.click()}
        >
        Upload CSV or Excel
        </button>
        </div>
    );
}
