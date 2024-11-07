import { ActionIcon, Image, Select, Space, Title } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import { memo, useCallback, useMemo, useState } from 'react';
import { ALL_IMAGE_PRESETS } from './p5_image_generation/imageGenPresets';
import { camelCaseToTitleCase } from './util';
import { P5ImageList } from './P5InfiniteCanvasList';


function App() {
  const [chosenPreset, setChosenPreset] = useState(Object.keys(ALL_IMAGE_PRESETS).at(0)!)

  const onPresetChange = useCallback((val: string) => {
    setChosenPreset(val)
  }, [])

  const presetOptions = useMemo(() => Object.keys(ALL_IMAGE_PRESETS).map(key => ({
    value: key,
    label: camelCaseToTitleCase(key)
  })), [])


  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100vw", height: "100vh" }}>
      <div className='app-background' />

      <div className='app-header'>
        <div style={{ display: "flex", flexDirection: "row", gap: 8, padding: 4, paddingLeft: 16, alignItems: "center", flexWrap: "wrap" }}>
          <Image src={require("./media/logo.png")} height={20} fit='contain' width={"auto"} />
          <Title order={6}>GIMME POLYGONS!</Title>
          <Space />
          <div style={{ minWidth: 50 }}>
            <Select onChange={onPresetChange} value={chosenPreset} data={presetOptions} />
          </div>
          <div style={{ flex: 1 }} />
          <ActionIcon variant="transparent" component="a" href="https://github.com/andersonaddo/gimme-polygons" target="_blank" rel="noopener noreferrer">
            <IconBrandGithub color='black' />
          </ActionIcon>
        </div>
        <div style={{ width: "100%", height: 4, backgroundColor: "black" }} />
      </div>

      <div style={{ width: "100%", flex: 1, paddingRight: 16, paddingLeft: 16 }}>
        <P5ImageList preset={ALL_IMAGE_PRESETS[chosenPreset]} />
      </div>
    </div>
  );
}

export default memo(App);
