"use client";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect } from "react";
import { Button } from "./ui/button";

function MeetingSetup({
  setisSetupComplete,
}: {
  setisSetupComplete: (value: boolean) => void;
}) {
  const [isMicCamToggeledOn, setIsMicCamToggeledOn] = React.useState(false);
  const call = useCall();
  useEffect(() => {
    if (isMicCamToggeledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggeledOn, call?.camera, call?.microphone]);

  return (
    <div className="flex h-screen w-full flex-col items-center justofy-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center gap-2 font-medium justify-center">
          <input
            type="checkbox"
            checked={isMicCamToggeledOn}
            onChange={(e) => setIsMicCamToggeledOn(e.target.checked)}
          ></input>
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        onClick={() => {
          call?.join();
          setisSetupComplete(true);
        }}
        className="rounded-md bg-green-500 px-4 py-2.5"
      >
        Join Meeting
      </Button>
    </div>
  );
}

export default MeetingSetup;
