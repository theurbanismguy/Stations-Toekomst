import walkCsvData from "@/assets/Station_BVO_Walk_15_mins.csv?raw";
import bikeCsvData from "@/assets/Station_BVO_Bike_15_mins.csv?raw";

export type TransportMode = 'walk' | 'bike';

export interface StationData {
  name: string;
  size: string;
  type: string;
  woon: number;
  werk: number;
  voorzieningen: number;
  total: number;
}

const parseCSV = (csvData: string, woonCol: number, werkCol: number, voorzCol: number): StationData[] => {
  const lines = csvData.trim().split("\n");
  const data: StationData[] = [];

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = line.split(",");
    const woon = parseInt(cols[woonCol]) || 0;
    const werk = parseInt(cols[werkCol]) || 0;
    const voorzieningen = parseInt(cols[voorzCol]) || 0;

    data.push({
      name: cols[0].replace(/^﻿/, ""), // Remove BOM if present
      size: cols[1],
      type: cols[2],
      woon,
      werk,
      voorzieningen,
      total: woon + werk + voorzieningen,
    });
  }

  return data;
};

export const parseStationData = (mode: TransportMode = 'walk'): StationData[] => {
  if (mode === 'bike') {
    // Bike CSV columns: Station, Size, Type, BikeF_15min_Woon, BikeF_15min_Werk, BikeF_15min_Voorzieningen
    return parseCSV(bikeCsvData, 3, 4, 5);
  } else {
    // Walk CSV columns: Station, Size, Type, Walk_15min_Woon, Walk_15min_Werk, Walk_15min_Voorzieningen
    return parseCSV(walkCsvData, 3, 4, 5);
  }
};

export const getStationStats = (data: StationData[]) => {
  const totalStations = data.length;
  const avgTotal = Math.round(
    data.reduce((sum, s) => sum + s.total, 0) / totalStations
  );
  const avgWoon = Math.round(
    data.reduce((sum, s) => sum + s.woon, 0) / totalStations
  );
  const avgWerk = Math.round(
    data.reduce((sum, s) => sum + s.werk, 0) / totalStations
  );
  const avgVoorzieningen = Math.round(
    data.reduce((sum, s) => sum + s.voorzieningen, 0) / totalStations
  );

  const topStation = [...data].sort((a, b) => b.total - a.total)[0];

  const totalWoon = data.reduce((sum, s) => sum + s.woon, 0);
  const totalWerk = data.reduce((sum, s) => sum + s.werk, 0);
  const totalVoorzieningen = data.reduce((sum, s) => sum + s.voorzieningen, 0);
  const grandTotal = totalWoon + totalWerk + totalVoorzieningen;

  return {
    totalStations,
    avgTotal,
    avgWoon,
    avgWerk,
    avgVoorzieningen,
    topStation,
    totalWoon,
    totalWerk,
    totalVoorzieningen,
    grandTotal,
  };
};

export const calculateDonutScale = (
  total: number,
  maxTotal: number,
  minScale: number = 60,
  maxScale: number = 140
): number => {
  if (maxTotal === 0) return minScale;
  const ratio = total / maxTotal;
  return minScale + ratio * (maxScale - minScale);
};

export const getTopBottomStations = (
  data: StationData[],
  count: number = 10
) => {
  const sorted = [...data].sort((a, b) => b.total - a.total);
  return {
    top: sorted.slice(0, count),
    bottom: sorted.slice(-count).reverse(),
  };
};
