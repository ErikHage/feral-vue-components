import type { VImg } from 'vuetify/components/VImg';
import FrImageComponent from './FrImage.vue';

/**
 * A Vuetify VImg. Its slots are VImg's: the default slot over the image, `placeholder` while it
 * loads, `error` if it fails, and `sources` for `<source>` elements. It accepts everything VImg
 * does, so it is typed as VImg. It sets no defaults
 */
export const FrImage = FrImageComponent as unknown as typeof VImg;
