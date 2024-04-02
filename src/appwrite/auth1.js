import conf from '../conf'
import { Account, Client, ID } from "appwrite";

class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({name, email, password}){
        try {
            const userAccount = await this.account.createAccount(ID.unique(), name, email, password);
            if(userAccount){
                this.login(email, password)
            }else{
                return userAccount
            }
        } catch (error) {
            console.log(`Error occurred :: createAccount :: ${error}`)
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log(`Error occurred :: getCurrentUser :: ${error}`)
        }
        return null
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log(`Error occurred :: login :: ${error}`)
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log(`Error occurred :: logout :: ${error}`)
        }
    }
}


const authService = new AuthService();
export default authService;