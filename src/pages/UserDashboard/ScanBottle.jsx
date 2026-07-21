import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, CircularProgress, Paper } from '@mui/material';
import { Html5Qrcode } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';

const dummyBottle = {
  id: 'BOTTLE-4981',
  brand: 'EcoPure',
  material: 'Recycled PET',
  points: 25,
};

export default function ScanBottle() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [success, setSuccess] = useState(false);
  const scannerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const startScanner = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Camera API not available on this device.');
        setLoading(false);
        return;
      }

      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const camera = devices.find((device) => device.kind === 'videoinput');
        if (!camera) {
          setError('No camera found.');
          setLoading(false);
          return;
        }

        const html5QrCode = new Html5Qrcode('qr-scanner');
        scannerRef.current = html5QrCode;
        setScanning(true);
        setLoading(false);

        await html5QrCode.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 280, height: 280 } },
          (decodedText) => {
            if (decodedText) {
              html5QrCode.stop().catch(() => {});
              setResult(decodedText);
              setScanning(false);
            }
          },
          (errorMessage) => {
            // ignore scan errors
          }
        );
      } catch (err) {
        setError('Camera permission denied or initialization failed.');
        setLoading(false);
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current?.stop) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const handleDispose = () => {
    setSuccess(true);
    setTimeout(() => navigate('/user/dashboard'), 1200);
  };

  const handleCancel = async () => {
    setError('Scan canceled by user.');
    setScanning(false);
    if (scannerRef.current?.stop) {
      await scannerRef.current.stop();
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Scan Bottle
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Point your camera at the bottle QR code and collect rewards instantly.
      </Typography>

      <Paper sx={{ p: 3, mt: 3, borderRadius: 4, boxShadow: 3 }}>
        {loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center', py: 10 }}>
            <CircularProgress />
            <Typography>Loading camera...</Typography>
          </Box>
        )}

        {error && (
          <Box sx={{ py: 6, textAlign: 'center' }}>
            <Typography variant="h6" color="error" gutterBottom>
              {error}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/user/dashboard')}>
              Back to Dashboard
            </Button>
          </Box>
        )}

        {!loading && !error && (
          <Box>
            <Box id="qr-scanner" sx={{ width: '100%', minHeight: 420, borderRadius: 3, overflow: 'hidden', position: 'relative', bgcolor: '#000' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, flexWrap: 'wrap', gap: 2 }}>
              <Button variant="contained" color="secondary" onClick={handleCancel} disabled={!scanning}>
                Cancel
              </Button>
              {result && (
                <Button variant="contained" color="primary" onClick={handleDispose}>
                  Dispose Bottle
                </Button>
              )}
            </Box>
          </Box>
        )}

        {result && !success && (
          <Box sx={{ mt: 4, p: 3, borderRadius: 3, bgcolor: 'grey.100' }}>
            <Typography variant="h6" gutterBottom>
              Bottle Detected
            </Typography>
            <Typography><strong>Bottle ID:</strong> {dummyBottle.id}</Typography>
            <Typography><strong>Brand:</strong> {dummyBottle.brand}</Typography>
            <Typography><strong>Material:</strong> {dummyBottle.material}</Typography>
            <Typography><strong>Reward Points:</strong> {dummyBottle.points}</Typography>
          </Box>
        )}

        {success && (
          <Box sx={{ mt: 4, textAlign: 'center', py: 5 }}>
            <Typography variant="h4" color="success.main" gutterBottom>
              Bottle Disposed Successfully!
            </Typography>
            <Typography>You earned {dummyBottle.points} points.</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
