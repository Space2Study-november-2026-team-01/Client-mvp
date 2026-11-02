import { TableColumn } from '~/types/components/components.index'
import { Categories } from '~/types/my-resources/myResources.index'
import { RequestParams } from '~/types/services/types/services.types'

export interface CategoriesParams extends RequestParams {
  name: string
}

export interface CreateCategoriesParams {
  name: Categories['name']
}

export interface ScreenBasedLimits {
  desktop?: number
  laptopAndDesktop?: number
  laptop?: number
  tablet: number
  mobile: number
  default: number
}

export interface RemoveColumnRules<T> {
  desktop?: TableColumn<T>['label'][]
  tablet?: TableColumn<T>['label'][]
  mobile?: TableColumn<T>['label'][]
}
