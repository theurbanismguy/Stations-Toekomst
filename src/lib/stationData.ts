import csvData from "@/assets/Station_BVO_Walk_15_mins.csv?raw";

export interface StationData {
  name: string;
  size: string;
  type: string;
  woon: number;
  werk: number;
  voorzieningen: number;
  total: number;
}

export const parseStationData = (): StationData[] => {
  const lines = csvData.trim().split("\n");
  const data: StationData[] = [];

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = line.split(",");
    const woon = parseInt(cols[3]) || 0;
    const werk = parseInt(cols[4]) || 0;
    const voorzieningen = parseInt(cols[5]) || 0;

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

  return {
    totalStations,
    avgTotal,
    avgWoon,
    avgWerk,
    avgVoorzieningen,
    topStation,
  };
};
