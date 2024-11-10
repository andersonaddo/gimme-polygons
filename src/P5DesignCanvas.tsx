import p5 from 'p5';
import { memo, useCallback, useContext, useEffect, useRef } from 'react';
import { generateImageDefinition } from './p5_image_generation/imageGen';
import { ImageGenerationPreset } from './p5_image_generation/imageGenPresets';
import { P5Context } from './P5Context';
import { formatDate } from './util';

const HEIGHT = 300
const WIDTH = 1000

function P5DesignCanvas(props: { preset: ImageGenerationPreset, seed?: number }) {
    const p5ContainerRef = useRef<HTMLDivElement | null>(null);
    const p5Context = useContext(P5Context)

    const sketch = useCallback((p: p5) => {
        //Once at setup
        p.setup = function () {
            if (props.seed) {
                p.randomSeed(props.seed)
                p.noiseSeed(props.seed)
            }
            p.createCanvas(WIDTH, HEIGHT)
            p.background(0);
            const image = generateImageDefinition(p, props.preset)
            for (const layer of image.layers) {
                layer.draw(p)
            }
        }

        //Every frame
        p.draw = function () { }
    }, [props.preset, props.seed])

    useEffect(() => {
        if (p5ContainerRef.current) {
            const p5Instance = new p5(sketch, p5ContainerRef.current);
            const fileTitle = `GIMME POLYGONS ${formatDate(new Date())} ${props.seed} ${process.env.REACT_APP_GIT_SHA}`
            p5Context.setP5SaveFunction?.(() => () => p5Instance.saveCanvas(fileTitle))
            return () => {
                p5Context.setP5SaveFunction?.(undefined)
                p5Instance.remove()
            };
        }
    }, [p5ContainerRef, sketch, p5Context, props.seed]);

    // Adding the min with and height prevents scroll position from changing when we request new images
    return (
        <div className='p5-image-parent' style={{ minHeight: HEIGHT, minWidth: WIDTH }} ref={p5ContainerRef} />
    );
}

export default memo(P5DesignCanvas);
