// src/components/SchemaMapper.tsx

'use client';

import { useState, useEffect } from 'react';
import { CountryCode, HeaderMapping, InternalField } from '@/types/schema';
import { countrySchemas } from '@/lib/countrySchemas';

interface Props {
    headers: string[];
    onMappingComplete: (mapping: HeaderMapping[], country: CountryCode) => void;
}

export default function SchemaMapper({ headers, onMappingComplete }: Props) {
    const [country, setCountry] = useState<CountryCode>('PK');
    const [mapping, setMapping] = useState<HeaderMapping[]>([]);

    const availableFields = countrySchemas[country];

    useEffect(() => {
        // Reset mapping when country changes
        const initialMapping: HeaderMapping[] = headers.map((header) => {
            const match = availableFields.find((f) =>
            f.possibleSourceHeaders.some(
                (possible) => possible.toLowerCase() === header.toLowerCase()
            )
            );

            return {
                sourceField: header,
                internalField: match?.internalField ?? '' as InternalField,
            };
        });

        setMapping(initialMapping);
    }, [country, headers]);

    const handleFieldChange = (index: number, newField: InternalField) => {
        const updated = [...mapping];
        updated[index].internalField = newField;
        setMapping(updated);
    };

    return (
        <div className="space-y-6">
        <div>
        <label className="block text-sm font-medium mb-1">🌍 Select Country</label>
        <select
        className="border px-3 py-2 rounded w-full"
        value={country}
        onChange={(e) => setCountry(e.target.value as CountryCode)}
        >
        <option value="PK">🇵🇰 Pakistan</option>
        <option value="UK">🇬🇧 United Kingdom</option>
        <option value="US">🇺🇸 United States</option>
        </select>
        </div>

        <div className="space-y-4">
        {mapping.map((map, idx) => (
            <div key={idx} className="flex items-center gap-4">
            <span className="w-1/2 text-sm font-mono truncate">{map.sourceField}</span>
            <select
            className="border px-2 py-1 rounded w-1/2"
            value={map.internalField}
            onChange={(e) =>
                handleFieldChange(idx, e.target.value as InternalField)
            }
            >
            <option value="">-- Select Field --</option>
            {availableFields.map((f) => (
                <option key={f.internalField} value={f.internalField}>
                {f.internalField}
                </option>
            ))}
            </select>
            </div>
        ))}
        </div>

        <button
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        onClick={() => onMappingComplete(mapping, country)}
        >
        ✅ Confirm Mapping
        </button>
        </div>
    );
}
