import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"

function Room() {
  const { roomId } = useParams();

  const myMeeting = async (element) => {
    const appID = 1483649828;
    const serverSecret = "275bdaa3888d90e8d967cae5c16494db";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), "E-Health");
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
        container: element,
        sharedLinks: [
            {
              name: 'Copy Link',
              url: `https://hackathontesting-1-l1av.onrender.com/docdashboard/room/${roomId}`,
            },
          ],          
        scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: false,
    })
  }

  useEffect(() => {
    console.log("Video Call Room ID:", roomId);
    // Initialize video call logic here (e.g., WebRTC or Peer.js)
  }, [roomId]);

  return (
    // <div className="flex justify-center items-center h-screen bg-gray-100">
    //   <h2 className="text-xl font-bold">Welcome to Video Call Room: {roomId}</h2>
    //   {/* Add Video Call UI here */}
    // </div>

    <div>
        <div ref={myMeeting} />
    </div>
  );
}

export default Room;
