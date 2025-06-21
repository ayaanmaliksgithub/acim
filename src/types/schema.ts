// src/types/schema.ts

export type InternalField =
| 'document_reference'
| 'number_of_items'
| 'price_per_unit'
| 'identity_number'
| 'origin_country'
| 'destination_country'
| 'declaration_date';

export interface ParsedRow {
    [key in InternalField]: string | number | Date | null;
}

export interface HeaderMapping {
    internalField: InternalField;
    sourceField: string; // CSV/XLSX column name
}

export type CountryCode = 'PK' | 'UK' | 'US';
