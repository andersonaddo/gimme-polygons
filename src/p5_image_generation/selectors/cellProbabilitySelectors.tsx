// Selectors are a type of function that return a function?
import p5 from "p5";

// returns a function that randomly returns true half the time
function evenSelector() {
  return () => Math.random() < 0.5;
}

// returns a function that randomly returns true every x other calls
function everyOtherSelector(x: number) {
  let counter = 0;
  return () => {
    counter++;
    return counter % x === 0;
  };
}

// returns a function that randomly returns true based on perlin noise
function perlinSelector(p: p5, smoothingFactor: number) {
  let counter = 0;
  return () => {
    counter++;
    //the greater the division the smoother the noise
    let val = p.noise(counter / smoothingFactor);
    return val < 0.5;
  };
}

// TODO: returns a function that returns batches of true randomly

// TODO: selector that combines other selectors?
//       union, intersection, swap between two, apply one if the other is true

export { evenSelector, everyOtherSelector, perlinSelector };
