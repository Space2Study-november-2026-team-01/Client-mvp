import {
  CategoryNameInterface,
  CommonEntityFields
} from '~/types/common/interfaces/common.interfaces'
import { Question } from '~/types/questions/interfaces/questions.interface'
import { RequestParams } from '~/types/services/types/services.types'

export interface Categories extends CommonEntityFields {
  name: string
  author: string
}

export interface GetResourcesParams extends Partial<RequestParams> {
  title?: string
  fileName?: string
}

export interface UpdateResourceCategory {
  name: Categories['name']
  id: Categories['_id']
}

export interface GetResourcesCategoriesParams extends Partial<RequestParams> {
  name?: string
}

export interface Attachment extends CommonEntityFields {
  author: string
  fileName: string
  size: number
  category: CategoryNameInterface | null
}

export interface LessonData {
  title: string
  description: string
  content: string
  attachments: Attachment[]
  category: string | null
}

export interface Lesson
  extends CommonEntityFields, Omit<LessonData, 'category'> {
  author: string
  category: CategoryNameInterface | null
}

export interface CreateQuizParams {
  title: string
  description: string
  items: Question[]
  category: string | null
}

export interface UpdateQuizParams extends CreateQuizParams {
  id: string
}

export interface Quiz extends CommonEntityFields {
  title: string
  description: string
  items: Question[]
  author: string
  category: CategoryNameInterface | null
}

export type CourseResources = Attachment | Lesson | Quiz
