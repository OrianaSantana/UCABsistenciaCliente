export interface MagnetometerData {
    x: number;
    y: number;
    z: number;
}

export function startMagnetometerUpdates(callback: (MagnetometerData) => void);
export function stopMagnetometerUpdates();
