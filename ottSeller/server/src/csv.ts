/**
 * Tiny RFC4180-compatible CSV parser. Handles quoted fields with escaped
 * double-quotes ("") and embedded newlines/commas. Returns rows as arrays of
 * strings; the caller maps them to objects via the header row.
 */
export function parseCsv(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;
  let i = 0;
  const text = input.replace(/^﻿/, ''); // strip BOM if present

  while (i < text.length) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      cell += ch;
      i++;
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (ch === ',') {
      row.push(cell);
      cell = '';
      i++;
      continue;
    }
    if (ch === '\r') {
      // Treat CRLF as a single newline, fall through to LF handling.
      i++;
      continue;
    }
    if (ch === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      i++;
      continue;
    }
    cell += ch;
    i++;
  }

  // Flush trailing cell/row if the file didn't end with a newline.
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  // Drop fully blank rows (all cells empty).
  return rows.filter((r) => r.some((c) => c.trim().length > 0));
}

export interface CsvObjectRow {
  [key: string]: string;
}

export function csvToObjects(input: string): { headers: string[]; rows: CsvObjectRow[] } {
  const rows = parseCsv(input);
  if (rows.length === 0) return { headers: [], rows: [] };

  const headers = rows[0]!.map((h) => h.trim());
  const objects: CsvObjectRow[] = [];

  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i]!;
    const obj: CsvObjectRow = {};
    headers.forEach((h, idx) => {
      obj[h] = (cells[idx] ?? '').trim();
    });
    objects.push(obj);
  }

  return { headers, rows: objects };
}
