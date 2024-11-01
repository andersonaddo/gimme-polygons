import p5 from 'p5';
import { memo, useCallback, useContext, useEffect, useRef } from 'react';
import { generateImageDefinition } from './p5_image_generation/imageGen';
import { ImageGenerationPreset } from './p5_image_generation/imageGenPresets';
import { P5Context } from './P5Context';

const HEIGHT = 300
const WIDTH = 1000

function P5DesignCanvas(props: { preset: ImageGenerationPreset }) {
    const p5ContainerRef = useRef<HTMLDivElement | null>(null);
    const p5Context = useContext(P5Context)

    const sketch = useCallback((p: p5) => {
        //Once at setup
        p.setup = function () {
            p.createCanvas(WIDTH, HEIGHT)
            p.background(0);
            const image = generateImageDefinition(p, props.preset)
            for (const layer of image.layers) {
                layer.draw(p)
            }
        }

        //Every frame
        p.draw = function () { }
    }, [props.preset])

    useEffect(() => {
        if (p5ContainerRef.current) {
            const p5Instance = new p5(sketch, p5ContainerRef.current);
            p5Context.setP5SaveFunction?.(() => () => p5Instance.saveCanvas(`GIMME POLYGONS ${(new Date()).toISOString()}`))
            return () => {
                p5Context.setP5SaveFunction?.(undefined)
                p5Instance.remove()
            };
        }
    }, [p5ContainerRef, sketch, p5Context]);

    return (
        <div ref={p5ContainerRef} />
    );
}

export default memo(P5DesignCanvas);
