import * as api from './registrationsApi'
import * as sample from './sample-data'

const useSampleData = import.meta.env.VITE_DATA_SOURCE === 'sample'

export const getRegistrations = useSampleData ? sample.getRegistrations : api.getRegistrations
export const getSummary = useSampleData ? sample.getSummary : api.getSummary
export const getRegistrationById = useSampleData ? sample.getRegistrationById : api.getRegistrationById
export const createRegistration = useSampleData ? sample.createRegistration : api.createRegistration
export { ApiError } from './registrationsApi'
