import p5 from "p5";

export type BooleanSelector = () => boolean;

/** 
 * returns a function that randomly returns true half the time
 */
function evenSelector(): BooleanSelector {
  return () => Math.random() < 0.5;
}

/** 
 * returns a function that randomly returns true every x other calls
 */
function everyOtherSelector(x: number): BooleanSelector {
  let counter = 0;
  return () => {
    counter++;
    return counter % x === 0;
  };
}


/** 
 * returns a function that randomly returns true based on perlin noise
 * @param smoothingFactor the greater the division the smoother the noise
 */
function perlinSelector(p: p5, smoothingFactor: number): BooleanSelector {
  let counter = p.random() * 10;
  return () => {
    counter += 1 * smoothingFactor;
    const val = p.noise(counter);
    return val < 0.5;
  };
}

// TODO: returns a function that returns batches of true randomly

// TODO: selector that combines other selectors?
//       union, intersection, swap between two, apply one if the other is true

export { evenSelector, everyOtherSelector, perlinSelector };
