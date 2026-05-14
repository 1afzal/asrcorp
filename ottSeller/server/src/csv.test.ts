import { describe, expect, it } from 'vitest';
import { csvToObjects, parseCsv } from './csv';

describe('parseCsv', () => {
  it('parses a simple comma-separated file', () => {
    const out = parseCsv('a,b,c\n1,2,3\n4,5,6\n');
    expect(out).toEqual([
      ['a', 'b', 'c'],
      ['1', '2', '3'],
      ['4', '5', '6'],
    ]);
  });

  it('handles quoted fields containing commas', () => {
    const out = parseCsv('name,desc\n"Adobe","Activated, fast"\n');
    expect(out).toEqual([
      ['name', 'desc'],
      ['Adobe', 'Activated, fast'],
    ]);
  });

  it('handles escaped double-quotes inside quoted fields', () => {
    const out = parseCsv('q\n"He said ""hi"""\n');
    expect(out).toEqual([['q'], ['He said "hi"']]);
  });

  it('handles CRLF line endings', () => {
    const out = parseCsv('a,b\r\n1,2\r\n3,4\r\n');
    expect(out).toEqual([
      ['a', 'b'],
      ['1', '2'],
      ['3', '4'],
    ]);
  });

  it('strips a leading BOM if present', () => {
    const out = parseCsv('﻿a,b\n1,2\n');
    expect(out[0]).toEqual(['a', 'b']);
  });

  it('drops fully-blank rows', () => {
    const out = parseCsv('a\n1\n\n\n2\n');
    expect(out).toEqual([['a'], ['1'], ['2']]);
  });

  it('handles a final row without a trailing newline', () => {
    const out = parseCsv('a,b\n1,2');
    expect(out).toEqual([
      ['a', 'b'],
      ['1', '2'],
    ]);
  });
});

describe('csvToObjects', () => {
  it('maps rows to objects keyed by header', () => {
    const { headers, rows } = csvToObjects('slug,name\nfigma,Figma Pro\ncanva,Canva Pro\n');
    expect(headers).toEqual(['slug', 'name']);
    expect(rows).toEqual([
      { slug: 'figma', name: 'Figma Pro' },
      { slug: 'canva', name: 'Canva Pro' },
    ]);
  });

  it('trims whitespace from cell values', () => {
    const { rows } = csvToObjects('a,b\n  hi  , world \n');
    expect(rows[0]).toEqual({ a: 'hi', b: 'world' });
  });

  it('returns empty result for empty input', () => {
    const { headers, rows } = csvToObjects('');
    expect(headers).toEqual([]);
    expect(rows).toEqual([]);
  });

  it('fills missing trailing cells with empty strings', () => {
    const { rows } = csvToObjects('a,b,c\n1,2\n');
    expect(rows[0]).toEqual({ a: '1', b: '2', c: '' });
  });
});
