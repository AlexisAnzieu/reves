import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import SequelizeAdapter from "@next-auth/sequelize-adapter"
import { Sequelize } from "sequelize"
import mysql2 from 'mysql2';

const sequelize = new Sequelize({
    host: 'api.h2t.club',
    port: 3310,
    username: 'root',
    dialectModule: mysql2,
    dialect: 'mysql',
    database: 'reves',
    password: 'Lesloges78'
})

export default NextAuth({
    providers: [
        FacebookProvider({
            clientId: '330534975770264',
            clientSecret: '31dfe9b20ff679f9bf001962f9fd9183',
            userinfo: {
                url: "https://graph.facebook.com/me",
                // https://developers.facebook.com/docs/graph-api/reference/user/#fields
                params: { fields: "id,name,email,picture.width(1000)" },
                async request({ tokens, client, provider }) {
                    return client.userinfo(tokens.access_token!, {
                        // @ts-expect-error
                        params: provider.userinfo?.params,
                    })
                },
            },
            profile(profile: any) {
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture.data.url,
                }
            },
        })
    ],
    adapter: SequelizeAdapter(sequelize),
    pages: {
        signIn: '/auth/login',
    },
    session: {
        maxAge: 60 * 60 * 24 * 7, // 1 week
    }
});
