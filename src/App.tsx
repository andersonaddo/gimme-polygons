import { ActionIcon, Button, Image, Select, Space, Title } from '@mantine/core';
import { IconBrandGithub, IconRefresh, IconZoomScan } from '@tabler/icons-react';
import { memo, useCallback, useMemo, useState } from 'react';
import { ALL_IMAGE_PRESETS, ImageGenerationPreset } from './p5_image_generation/imageGenPresets';
import { P5Image } from './P5Image';
import { camelCaseToTitleCase } from './util';

const NUMBER_OF_IMAGES = 10
const IMAGE_LIST_PARENT_ID = "image-list-parent"
const IMAGE_LIST_ID = "image-list-component"

function ImageListImpl(props: { preset: ImageGenerationPreset }) {
  const indexes = Array.from(Array(NUMBER_OF_IMAGES).keys())
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "fit-content" }}>
      {indexes.map(index =>
        <div style={{ padding: 16, width: "fit-content" }} key={index}>
          <P5Image preset={props.preset} title={`Image ${index + 1}`} />
        </div>
      )}
    </div>
  );
}

const ImageList = memo(ImageListImpl)

function App() {
  const [version, setVersion] = useState(0)
  const [chosenPreset, setChosenPreset] = useState(Object.keys(ALL_IMAGE_PRESETS).at(0)!)
  const [inFitMode, setInFitMode] = useState(false)

  const increaseVersion = useCallback(() => {
    setVersion(prevVersion => prevVersion + 1)
  }, [setVersion])

  const onPresetChange = useCallback((val: string) => {
    setChosenPreset(val)
  }, [])

  const presetOptions = useMemo(() => Object.keys(ALL_IMAGE_PRESETS).map(key => ({
    value: key,
    label: camelCaseToTitleCase(key)
  })), [])

  const toggleFitMode = useCallback(() => {
    const list = document.getElementById(IMAGE_LIST_ID);
    const listParent = document.getElementById(IMAGE_LIST_PARENT_ID);
    if (!list || !listParent) return

    if (inFitMode) {
      list.style.transform = "unset"
      list.style.transformOrigin = "unset"
      setInFitMode(false)
    } else {
      const currentWidth = list.offsetWidth
      const targetWidth = listParent.offsetWidth
      console.log({ currentWidth, targetWidth })
      const ratio = targetWidth / currentWidth
      list.style.transform = `scale(${ratio})`
      list.style.transformOrigin = "top left"
      setInFitMode(true)
    }
  }, [inFitMode])


  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column" }}>
      <div className='app-background' />

      <div className='app-header'>
        <div style={{ display: "flex", flexDirection: "row", gap: 8, padding: 16, paddingTop: 8, paddingBottom: 8, alignItems: "center", flexWrap: "wrap" }}>
          <Image src={require("./media/logo.png")} height={20} fit='contain' width={"auto"} />
          <Title order={6}>GIMME POLYGONS!</Title>
          <Space />
          <Button onClick={increaseVersion}>
            <IconRefresh />
          </Button>
          <Button onClick={toggleFitMode}>
            <IconZoomScan />
          </Button>
          <Space />
          <div style={{ minWidth: 50 }}>
            <Select onChange={onPresetChange} value={chosenPreset} data={presetOptions} />
          </div>
          <div style={{ flex: 1 }} />
          <ActionIcon variant="transparent" component="a" href="https://github.com/andersonaddo/gimme-polygons" target="_blank" rel="noopener noreferrer">
            <IconBrandGithub color='black' />
          </ActionIcon>
        </div>
      </div>

      <div style={{ flex: 1, width: "100%", overflow: "scroll" }} id={IMAGE_LIST_PARENT_ID}>
        <div style={{ width: "fit-content" }} id={IMAGE_LIST_ID}>
          <ImageList key={version} preset={ALL_IMAGE_PRESETS[chosenPreset]} />
        </div>
      </div>
    </div>
  );
}

export default memo(App);
