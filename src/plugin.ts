import type { Component, Plugin } from 'vue';
import { FrAccordion } from './components/FrAccordion';
import { FrAccordionPanel } from './components/FrAccordionPanel';
import { FrAlert } from './components/FrAlert';
import { FrAutocomplete } from './components/FrAutocomplete';
import { FrAvatar } from './components/FrAvatar';
import { FrBadge } from './components/FrBadge';
import { FrBreadcrumbs } from './components/FrBreadcrumbs';
import { FrBtn } from './components/FrBtn';
import { FrCard } from './components/FrCard';
import { FrCheckbox } from './components/FrCheckbox';
import { FrChip } from './components/FrChip';
import { FrChipGroup } from './components/FrChipGroup';
import { FrCodeBlock } from './components/FrCodeBlock';
import { FrCol } from './components/FrCol';
import { FrContainer } from './components/FrContainer';
import { FrDataTable } from './components/FrDataTable';
import { FrDialog } from './components/FrDialog';
import { FrDivider } from './components/FrDivider';
import { FrFadeIn } from './components/FrFadeIn';
import { FrFileField } from './components/FrFileField';
import { FrForm } from './components/FrForm';
import { FrIcon } from './components/FrIcon';
import { FrIconBtn } from './components/FrIconBtn';
import { FrImage } from './components/FrImage';
import { FrList } from './components/FrList';
import { FrListHeader } from './components/FrListHeader';
import { FrListItem } from './components/FrListItem';
import { FrMenu } from './components/FrMenu';
import { FrProgressBar } from './components/FrProgressBar';
import { FrRow } from './components/FrRow';
import { FrSelect } from './components/FrSelect';
import { FrSkeleton } from './components/FrSkeleton';
import { FrSlider } from './components/FrSlider';
import { FrSpacer } from './components/FrSpacer';
import { FrSpinner } from './components/FrSpinner';
import { FrSheet } from './components/FrSheet';
import { FrTable } from './components/FrTable';
import { FrTabs } from './components/FrTabs';
import { FrTimeline } from './components/FrTimeline';
import { FrSnackbarQueue } from './components/FrSnackbarQueue';
import { FrToggle } from './components/FrToggle';
import { FrTooltip } from './components/FrTooltip';
import { FrTree } from './components/FrTree';
import { FrFieldGroup } from './components/FrFieldGroup';
import { FrGrid } from './components/FrGrid';

export function createComponentsPlugin(components: Record<string, Component>): Plugin {
  return {
    install(app) {
      for (const [name, component] of Object.entries(components)) {
        app.component(name, component);
      }
    },
  };
}

/**
 * Registers every Fr* component globally, so `<fr-card>` works in any template without an
 * import. Named imports work without it.
 */
export const FeralComponents: Plugin = createComponentsPlugin({
  FrAccordion,
  FrAccordionPanel,
  FrAlert,
  FrAutocomplete,
  FrAvatar,
  FrBadge,
  FrBreadcrumbs,
  FrBtn,
  FrCard,
  FrCheckbox,
  FrChip,
  FrChipGroup,
  FrCodeBlock,
  FrCol,
  FrContainer,
  FrDataTable,
  FrDialog,
  FrDivider,
  FrFadeIn,
  FrFileField,
  FrForm,
  FrIcon,
  FrIconBtn,
  FrImage,
  FrList,
  FrListHeader,
  FrListItem,
  FrMenu,
  FrProgressBar,
  FrRow,
  FrSelect,
  FrSkeleton,
  FrSlider,
  FrSpacer,
  FrSpinner,
  FrSheet,
  FrTable,
  FrTabs,
  FrTimeline,
  FrSnackbarQueue,
  FrToggle,
  FrTooltip,
  FrTree,
  FrFieldGroup,
  FrGrid,
});
