'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import SchemaMapper from '@/components/SchemaMapper';
import { ParsedFile } from '@/lib/parseFile';
import { HeaderMapping, CountryCode } from '@/types/schema';

export default function ImportPage() {
    const [parsedData, setParsedData] = useState<ParsedFile | null>(null);
    const [fileName, setFileName] = useState('');
    const [mapping, setMapping] = useState<HeaderMapping[] | null>(null);
    const [country, setCountry] = useState<CountryCode | null>(null);

    const handleParsed = (data: ParsedFile, name: string) => {
        setParsedData(data);
        setFileName(name);
        setMapping(null); // reset if new file
    };

    const handleMappingComplete = (
        map: HeaderMapping[],
        selectedCountry: CountryCode
    ) => {
        setMapping(map);
        setCountry(selectedCountry);
        console.log('Confirmed Mapping:', map);
        console.log('Country:', selectedCountry);
    };

    return (
        <div className="p-8 space-y-6">
        <h1 className="text-2xl font-bold">📤 Import & Map Trade Data</h1>

        {!parsedData && (
            <FileUpload onFileParsed={handleParsed} />
        )}

        {parsedData && !mapping && (
            <SchemaMapper
            headers={parsedData.headers}
            onMappingComplete={handleMappingComplete}
            />
        )}

        {parsedData && mapping && (
            <div className="bg-gray-50 border p-4 rounded text-sm">
            ✅ Mapping confirmed. Ready to save or transform data.
            <pre className="mt-2 max-h-[300px] overflow-auto text-xs">
            {JSON.stringify(mapping, null, 2)}
            </pre>
            </div>
        )}
        </div>
    );
}
