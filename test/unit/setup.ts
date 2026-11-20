// jsdom has no ResizeObserver, which several Vuetify components use
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver;

// jsdom has no visualViewport either. Vuetify's overlays (a VAutocomplete's list, say) read the
// bare global with `visualViewport?.`, so it must exist; null makes them skip its listeners
if (!('visualViewport' in globalThis)) {
  Object.defineProperty(globalThis, 'visualViewport', { value: null, configurable: true });
}
