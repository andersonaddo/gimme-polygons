import { memo, useCallback, useState } from 'react';
import './App.css';
import P5DesignCanvas from './P5DesignCanvas';
import { ImageGenerationPreset } from './p5_image_generation/imageGenPresets';
import { ALL_IMAGE_PRESETS } from './p5_image_generation/imageGenPresets';

const NUMBER_OF_IMAGES = 5

function ImagesImpl(props: { preset: ImageGenerationPreset }) {
  const indexes = Array.from(Array(NUMBER_OF_IMAGES).keys())
  return (
    <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", "gap": 10, padding: 8 }}>
      {indexes.map(index =>
        <div key={index}>
          <p>Image {index}</p>
          <P5DesignCanvas preset={props.preset} />
        </div>
      )}
    </div>
  );
}

const Images = memo(ImagesImpl)


function App() {
  const [version, setVersion] = useState(0)
  const [chosenPreset, setChosenPreset] = useState(Object.keys(ALL_IMAGE_PRESETS).at(0)!)

  const increaseVersion = useCallback(() => {
    setVersion(prevVersion => prevVersion + 1)
  }, [setVersion])

  const onPresetChange: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
    setChosenPreset(e.target.value)
  }, [])

  return (
    <div>
      <div style={{ width: "100%", position: "sticky", backgroundColor: "gray", top: 0 }}>
        <button onClick={increaseVersion}>
          Refresh
        </button>
        <select onChange={onPresetChange}>
          {Object.keys(ALL_IMAGE_PRESETS).map(key => <option value={key} key={key}>{key}</option>)}
        </select>

      </div>
      <Images key={version} preset={ALL_IMAGE_PRESETS[chosenPreset]} />
    </div>
  );
}

export default memo(App);
