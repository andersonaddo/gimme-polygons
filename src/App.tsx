import { ActionIcon, Button, Image, Select, Space, Text, Title } from '@mantine/core';
import { IconBrandGithub, IconDownload } from '@tabler/icons-react';
import { memo, useCallback, useContext, useMemo, useState } from 'react';
import { ALL_IMAGE_PRESETS, ImageGenerationPreset } from './p5_image_generation/imageGenPresets';
import { P5Context, P5ContextProvider } from './P5Context';
import P5DesignCanvas from './P5DesignCanvas';

const NUMBER_OF_IMAGES = 5

function P5DownloadButton() {
  const p5Context = useContext(P5Context)
  return (
    <div>
      <ActionIcon onClick={p5Context.p5SaveFunction}>
        <IconDownload />
      </ActionIcon>
    </div>
  );
}


function ImagesImpl(props: { preset: ImageGenerationPreset }) {
  const indexes = Array.from(Array(NUMBER_OF_IMAGES).keys())

  return (

    <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", "gap": 10, padding: 8 }}>
      {indexes.map(index =>
        <div key={index}>
          <P5ContextProvider>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Text>Image {index}</Text>
              <P5DownloadButton />
            </div>
            <P5DesignCanvas preset={props.preset} />
          </P5ContextProvider>
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

  const onPresetChange = useCallback((val: string) => {
    setChosenPreset(val)
  }, [])

  // https://stackoverflow.com/questions/4149276/how-to-convert-camelcase-to-camel-case
  const camelCaseToTitleCase = useCallback((str: string) => {
    return str.replace(
      /(^[a-z]+)|[0-9]+|[A-Z][a-z]+|[A-Z]+(?=[A-Z][a-z]|[0-9])/g,
      function (match, first) {
        if (first) match = match[0].toUpperCase() + match.substr(1);
        return match + ' ';
      }
    )
  }, [])

  const presetOptions = useMemo(() => Object.keys(ALL_IMAGE_PRESETS).map(key => ({
    value: key,
    label: camelCaseToTitleCase(key)
  })), [camelCaseToTitleCase])


  return (
    <div>
      <div style={{ width: "100%", position: "sticky", backgroundColor: "#fffff2", top: 0, paddingTop: 4 }}>
        <div style={{ display: "flex", flexDirection: "row", gap: 8, padding: 4, alignItems: "center", flexWrap: "wrap" }}>
          <Image src={require("./media/logo.png")} height={20} fit='contain' width={"auto"} />
          <Title order={6}>GIMME POLYGONS!</Title>
          <Space />
          <Button onClick={increaseVersion}>
            Refresh Images
          </Button>
          <Space />
          <div style={{ minWidth: 50 }}>
            <Select onChange={onPresetChange} value={chosenPreset} data={presetOptions} />
          </div>
          <ActionIcon variant="transparent" component="a" href="https://github.com/andersonaddo/gimme-polygons" target="_blank" rel="noopener noreferrer">
            <IconBrandGithub color='black' />
          </ActionIcon>
        </div>
        <div style={{ width: "100%", height: 4, backgroundColor: "black" }} />
      </div>

      <Images key={version} preset={ALL_IMAGE_PRESETS[chosenPreset]} />
    </div >
  );
}

export default memo(App);
