import { connectToDb } from "../mongoose"

export const testing = async() => {
    connectToDb()
}