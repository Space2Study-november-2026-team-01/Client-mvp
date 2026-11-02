import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import Typography from '@mui/material/Typography'

import AppChip from '~/components/app-chip/AppChip'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'

import { styles } from '~/containers/add-resources/AddResources.styles'
import { getFormattedDate } from '~/utils/helper-functions'
import {
  AdditionalPropsInterface,
  Attachment,
  RemoveColumnRules,
  TableColumn
} from '~/types'

export const columns: TableColumn<Attachment>[] = [
  {
    label: 'myResourcesPage.tabs.attachments',
    field: 'fileName',
    calculatedCellValue: (attachment) => (
      <IconExtensionWithTitle
        icon={<InsertDriveFileOutlinedIcon />}
        size={attachment.size}
        title={attachment.fileName}
      />
    )
  },
  {
    label: 'myResourcesPage.categories.category',
    field: 'category',
    calculatedCellValue: (
      attachment: Attachment,
      { t }: AdditionalPropsInterface
    ) =>
      attachment.category ? (
        <AppChip labelSx={styles.categoryChipLabel} sx={styles.categoryChip}>
          {attachment.category.name}
        </AppChip>
      ) : (
        <Typography sx={styles.date}>
          {t('myResourcesPage.categories.noCategory')}
        </Typography>
      )
  },
  {
    label: 'myResourcesPage.categories.updated',
    field: 'updatedAt',
    calculatedCellValue: (attachment) =>
      getFormattedDate({ date: attachment.updatedAt })
  }
]

export const removeColumnRules: RemoveColumnRules<Attachment> = {
  tablet: ['myResourcesPage.categories.updated']
}
