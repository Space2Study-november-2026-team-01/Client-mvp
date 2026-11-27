import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

const getCountries = () => axiosClient.get(URLs.locations.countries)

export default {
  getCountries
}
