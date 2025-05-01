import React, { useRef, useState, useEffect } from 'react';
import RecordRTC from 'recordrtc';
import { Video, StopCircle, Download } from 'lucide-react';

interface RaceRecorderProps {
  isRacing: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const RaceRecorder: React.FC<RaceRecorderProps> = ({ isRacing, canvasRef }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const recorderRef = useRef<RecordRTC | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    if (!canvasRef.current) return;

    try {
      const stream = canvasRef.current.captureStream(30); // 30 FPS
      mediaStreamRef.current = stream;

      recorderRef.current = new RecordRTC(stream, {
        type: 'video',
        mimeType: 'video/webm;codecs=vp9',
        bitsPerSecond: 128000
      });

      recorderRef.current.startRecording();
      setIsRecording(true);
      setRecordedBlob(null);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (!recorderRef.current) return;

    recorderRef.current.stopRecording(() => {
      const blob = recorderRef.current?.getBlob();
      if (blob) {
        setRecordedBlob(blob);
      }
      setIsRecording(false);

      // Clean up
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      mediaStreamRef.current = null;
      recorderRef.current = null;
    });
  };

  const downloadRecording = () => {
    if (!recordedBlob) return;

    const url = URL.createObjectURL(recordedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'race-recording.webm';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Stop recording when race ends
  useEffect(() => {
    if (!isRacing && isRecording) {
      stopRecording();
    }
  }, [isRacing]);

  return (
    <div className="absolute top-4 right-4 flex items-center space-x-2">
      {!isRecording && !recordedBlob && isRacing && (
        <button
          onClick={startRecording}
          className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <Video className="h-5 w-5" />
          <span>Record Race</span>
        </button>
      )}

      {isRecording && (
        <button
          onClick={stopRecording}
          className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 animate-pulse"
        >
          <StopCircle className="h-5 w-5" />
          <span>Stop Recording</span>
        </button>
      )}

      {recordedBlob && (
        <button
          onClick={downloadRecording}
          className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Download className="h-5 w-5" />
          <span>Download Recording</span>
        </button>
      )}
    </div>
  );
};

export default RaceRecorder;