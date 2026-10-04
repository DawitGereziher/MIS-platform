export interface FayidaVerificationResult {
  verified: boolean;
  fayidaId: string;
  fullName: string;
  dob: string;
  gender: 'Female' | 'Male';
  region: string;
  photoUrl?: string;
  statusMessage: string;
}

export class FayidaNationalIdService {
  /**
   * Simulates real-time verification against the Ethiopian National ID Program (NIDP) Fayida API
   */
  static async verifyId(fayidaId: string): Promise<FayidaVerificationResult> {
    // Artificial latency to simulate secure TLS government gateway verification
    await new Promise(res => setTimeout(res, 600));

    const cleanId = fayidaId.trim().toUpperCase();

    if (!cleanId.startsWith('ET-FAY-') && cleanId.length < 8) {
      return {
        verified: false,
        fayidaId: cleanId,
        fullName: '',
        dob: '',
        gender: 'Female',
        region: '',
        statusMessage: 'Invalid Fayida ID format. Format must follow ET-FAY-XXXXXXXX.',
      };
    }

    return {
      verified: true,
      fayidaId: cleanId,
      fullName: 'Verified National ID Holder',
      dob: '2001-04-12',
      gender: 'Female',
      region: 'Oromia',
      statusMessage: 'Fayida National ID successfully authenticated via NIDP Gateway. Biometrics match.',
    };
  }
}
