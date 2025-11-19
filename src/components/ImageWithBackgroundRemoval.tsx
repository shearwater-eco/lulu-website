import { useEffect, useState } from 'react';
import { removeBackground, loadImageFromUrl } from '@/lib/backgroundRemoval';
import { Loader2 } from 'lucide-react';

interface ImageWithBackgroundRemovalProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithBackgroundRemoval = ({ src, alt, className }: ImageWithBackgroundRemovalProps) => {
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processImage = async () => {
      try {
        setIsProcessing(true);
        setError(null);
        
        // Load the image
        const imageElement = await loadImageFromUrl(src);
        
        // Remove background
        const processedBlob = await removeBackground(imageElement);
        
        // Create URL for the processed image
        const url = URL.createObjectURL(processedBlob);
        setProcessedImageUrl(url);
      } catch (err) {
        console.error('Failed to process image:', err);
        setError('Failed to remove background');
      } finally {
        setIsProcessing(false);
      }
    };

    processImage();

    // Cleanup
    return () => {
      if (processedImageUrl) {
        URL.revokeObjectURL(processedImageUrl);
      }
    };
  }, [src]);

  if (isProcessing) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin" style={{ color: 'hsl(var(--tile-teal))' }} />
          <p className="text-sm text-muted-foreground">Removing background...</p>
        </div>
      </div>
    );
  }

  if (error || !processedImageUrl) {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={className}
      />
    );
  }

  return (
    <img 
      src={processedImageUrl} 
      alt={alt} 
      className={className}
    />
  );
};

export default ImageWithBackgroundRemoval;
