// src/lib/countrySchemas.ts

import { InternalField, CountryCode } from '@/types/schema';

interface FieldMap {
    internalField: InternalField;
    possibleSourceHeaders: string[];
}

export const countrySchemas: Record<CountryCode, FieldMap[]> = {
    PK: [
        { internalField: 'document_reference', possibleSourceHeaders: ['Invoice No', 'Doc Ref', 'Reference Number'] },
        { internalField: 'number_of_items', possibleSourceHeaders: ['Qty', 'Quantity', 'No of Items'] },
        { internalField: 'price_per_unit', possibleSourceHeaders: ['Rate', 'Price/Unit', 'Unit Price'] },
        { internalField: 'identity_number', possibleSourceHeaders: ['CNIC', 'NTN', 'Business Reg No.'] },
        { internalField: 'origin_country', possibleSourceHeaders: ['Origin Country', 'Country of Origin'] },
        { internalField: 'destination_country', possibleSourceHeaders: ['Destination', 'Destination Country'] },
        { internalField: 'declaration_date', possibleSourceHeaders: ['Declaration Date', 'Shipping Date'] },
    ],
    UK: [
        { internalField: 'document_reference', possibleSourceHeaders: ['Invoice Number', 'Reference'] },
        { internalField: 'number_of_items', possibleSourceHeaders: ['Quantity', 'Number of Items'] },
        { internalField: 'price_per_unit', possibleSourceHeaders: ['Unit Price', 'Price'] },
        { internalField: 'identity_number', possibleSourceHeaders: ['Company Number', 'VAT Number'] },
        { internalField: 'origin_country', possibleSourceHeaders: ['Origin'] },
        { internalField: 'destination_country', possibleSourceHeaders: ['Destination'] },
        { internalField: 'declaration_date', possibleSourceHeaders: ['Declaration Date', 'Shipment Date'] },
    ],
    US: [
        { internalField: 'document_reference', possibleSourceHeaders: ['Invoice ID', 'Doc Ref'] },
        { internalField: 'number_of_items', possibleSourceHeaders: ['Quantity', 'Items Count'] },
        { internalField: 'price_per_unit', possibleSourceHeaders: ['Unit Price', 'Price per Item'] },
        { internalField: 'identity_number', possibleSourceHeaders: ['EIN', 'Business ID'] },
        { internalField: 'origin_country', possibleSourceHeaders: ['Origin Country'] },
        { internalField: 'destination_country', possibleSourceHeaders: ['Destination Country'] },
        { internalField: 'declaration_date', possibleSourceHeaders: ['Declaration Date'] },
    ],
};
