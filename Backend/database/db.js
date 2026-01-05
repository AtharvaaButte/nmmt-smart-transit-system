import postgres from 'postgres'
import { getDBUrl } from '../config/env.js'

const connectionString = getDBUrl() 

const sql = postgres(connectionString)

export default sql