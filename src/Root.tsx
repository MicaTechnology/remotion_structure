import "./index.css";
import { Composition } from "remotion";
import { MobileVideo } from "./videos/MobileVideo";
import { DesktopVideo } from "./videos/DesktopVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MicaMobile"
        component={MobileVideo}
        durationInFrames={780}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="MicaDesktop"
        component={DesktopVideo}
        durationInFrames={630}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
