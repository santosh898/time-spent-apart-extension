import { useEffect, useRef, useState } from "react";
import { Particle } from "./Particle";
import me from "./me.png";
import she from "./she.png";
import "./styles.css";

export default function App() {
  const [timeSince, setTimeSince] = useState("0000:00:00");
  const [timeSinceInDays, setTimeSinceInDays] = useState(0);

  const canvasRef = useRef();

  useEffect(() => {
    const init = async () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener("resize", resizeCanvas, false);

      resizeCanvas();

      const particles = [];
      [...Array(10).keys()].forEach(() => {
        particles.push(new Particle(canvas, context));
      });

      const animate = () => {
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        // context.globalAlpha = 0.3;
        particles.forEach((particle) => particle.update());
        requestAnimationFrame(animate);
      };
      animate();
    };

    init();
  }, []);

  useEffect(() => {
    const setDiff = () => {
      const format = (str) => `0${str}`.slice(-2);
      const startDate = new Date(2020, 3, 15);
      const endDate = new Date();
      const diffInMs = endDate.getTime() - startDate.getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      let totalSeconds = diffInMs / 1000;

      const hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      const minutes = format(Math.floor(totalSeconds / 60));
      const seconds = format(Math.floor(totalSeconds % 60));

      const timeSince = `${hours}:${minutes}:${seconds}`;

      setTimeSince(timeSince);
      setTimeSinceInDays(Math.floor(diffInDays));
    };
    setInterval(setDiff, 1000);
    setDiff();
  }, []);

  return (
    <div className="App">
      <canvas ref={canvasRef} />
      <div className="us">
        <div className="she">
          <img src={she} alt="she" />
        </div>
        <div className="me">
          <img src={me} alt="me" />
        </div>
        <div className="time-container">
          <div className="glitch-text title" data-text="Time spent">
            Time spent
          </div>
          <div className="glitch-text time" data-text={timeSince}>
            {timeSince}
          </div>
          <div
            className="glitch-text days"
            data-text={`${timeSinceInDays} days`}
          >
            {`${timeSinceInDays} days`}
          </div>
        </div>
      </div>
    </div>
  );
}
