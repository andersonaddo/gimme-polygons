export const DummySelector = (name?: string): () => any => {
    return () => {
        throw Error(`Dummy Selector (${name ?? "Unknown name"}) called. Check your image generation presets - there is a selector needed that hasn't been defined.`)
    }
}