import p5 from "p5";

export type BooleanSelector = (x?: number, y?: number) => boolean;

/**
 * returns a function that returns false all the time
 */
function never(): BooleanSelector {
  return () => false
}

/**
 * returns a function that returns true all the time
 */
function always(): BooleanSelector {
  return () => true
}

/**
 * returns a function that randomly returns true half the time
 */
function evenSelector(): BooleanSelector {
  return () => Math.random() < 0.5;
}

/**
 * returns a function that randomly returns true x the time
 */
function randomSelector(x: number): BooleanSelector {
  return () => Math.random() < x;
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
    const noiseValue = p.noise(counter);
    return noiseValue < 0.5;
  };
}

/**
 * returns a function that randomly returns true in batches using sine
 *   and a random cutoff
 */
function sineBatchSelector(p: p5): BooleanSelector {
  let counter =  p.random() * 100;

  const randomCutoff = p.random(0.3,1) // Random cutoff for variability

  return () => {
    counter++;
    const sineValue = Math.sin((counter / 100) * Math.PI * 2); // Adjust the divisor for desired effect
    return sineValue > randomCutoff;
  };
}


// TODO: returns a function that returns batches of true randomly

export const BooleanSelectors = { evenSelector, everyOtherSelector, perlinSelector, randomSelector, always, never , sineBatchSelector};