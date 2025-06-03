if (typeof window !== 'undefined') {
    window.matchMedia = window.matchMedia || function(query) {
        return {
            matches: false,
            media: query,
            onchange: null,
            addListener: () => {}, // Deprecated
            removeListener: () => {}, // Deprecated
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
        };
    };
}