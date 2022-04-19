import "./style.css";

import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(TextPlugin);

const randInt = (max = 10, min = 0) =>
  Math.floor(Math.random() * (max - min)) + min;

document.querySelector("button")!.addEventListener("click", function () {
  document.body.removeChild(this);
  const main = document.createElement("main");
  document.body.appendChild(main);

  let timeline = gsap.timeline();
  for (
    let i = 0,
      limit = randInt(window.innerWidth / 10, window.innerWidth / 10 / 4);
    i < limit;
    i++
  ) {
    const sLeft = randInt(-5, -10);
    const sTop = randInt(100, 90);
    const eLeft = randInt(100, 75);
    const eTop = randInt(50, -10);

    const div = document.createElement("div");
    div.innerHTML = "&hearts;";
    div.style.left = sLeft + "vw";
    div.style.top = sTop + "vh";
    div.style.zIndex = randInt(4, 2).toString();
    main.appendChild(div);

    let path: any[] = [];
    let left = sLeft;
    let top = sTop;
    do {
      if (left < eLeft) left += randInt(15, 5);
      if (top > eTop) top -= randInt(15, 5);
      path.push({
        left: left + "vw",
        top: top + "vh",
        rotation: randInt(15, -15) + "deg",
      });
    } while (left < eLeft || top > eTop);

    // wobbling
    gsap.to(div, {
      duration: randInt(5, 2),
      rotation: (randInt(1) === 0 ? "-=" : "+=") + randInt(10, 5),
      onComplete() {
        gsap.to(div, {
          duration: randInt(5, 2),
          rotation: (randInt(1) === 0 ? "-=" : "+=") + randInt(10, 5),
        });
      },
    });

    // bobbing
    let onComplete = function () {
      gsap.to(div, {
        duration: randInt(6, 3),
        top: `${randInt(2) === 0 ? "-=" : "+="}${Math.random()}em`,
        onComplete,
      });
    };

    timeline = timeline.to(
      div,
      {
        stagger: 0.5,
        duration: path.length,
        motionPath: { path, end: Math.random() },
        onComplete,
      },
      (Math.random() * limit) / 5
    );
  }

  const h1 = document.createElement("h1");
  main.appendChild(h1);
  timeline.to(
    h1,
    {
      duration: 2,
      text: {
        value: "Happy Birthday",
      },
      opacity: 1,
    },
    1
  );

  document.querySelector("audio")!.play();
});
