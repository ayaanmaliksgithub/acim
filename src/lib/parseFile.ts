// src/lib/parseFile.ts

import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export interface ParsedFile {
    headers: string[];
    rows: Record<string, any>[];
}

export async function parseFile(file: File): Promise<ParsedFile> {
    const ext = file.name.split('.').pop()?.toLowerCase();

    if (ext === 'csv') {
        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const headers = results.meta.fields || [];
                    resolve({ headers, rows: results.data as Record<string, any>[] });
                },
                error: (error) => reject(error),
            });
        });
    }

    if (ext === 'xlsx' || ext === 'xls') {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });
        const headers = Object.keys(json[0] || {});
        return { headers, rows: json as Record<string, any>[] };
    }

    throw new Error('Unsupported file format. Please upload a CSV or XLSX file.');
}
