import type { VSkeletonLoader } from 'vuetify/components/VSkeletonLoader';
import FrSkeletonComponent from './FrSkeleton.vue';

/**
 * A Vuetify VSkeletonLoader: grey shapes (`type`, such as `"heading, paragraph"`) standing in for
 * content still loading. Given a default slot, it shows that content instead once `loading` is
 * false. It accepts everything VSkeletonLoader does, so it is typed as VSkeletonLoader. It sets no
 * defaults
 */
export const FrSkeleton = FrSkeletonComponent as unknown as typeof VSkeletonLoader;
