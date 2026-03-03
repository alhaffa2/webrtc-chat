const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    // أضف TURN server للإنتاج
  ]
};

async function createPeerConnection() {
  const pc = new RTCPeerConnection(configuration);
  
  // إضافة الفيديو المحلي
  const stream = await navigator.mediaDevices.getUserMedia({ 
    video: true, 
    audio: true 
  });
  stream.getTracks().forEach(track => pc.addTrack(track, stream));
  
  // استقبال الفيديو البعيد
  pc.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };
  
  return pc;
}
