const callAndFreeze = <T extends () => any>(selector: T): () => ReturnType<T> => {
    const value = selector()
    return () => value
}

export const SelectorUtils = { callAndFreeze }