import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter"
import { DataTypes, Sequelize } from "sequelize"
import mysql2 from 'mysql2';
import { directus } from "../../../helpers/directus";

const sequelize = new Sequelize({
    host: process.env.MYSQL_HOST,
    port: 3310,
    username: process.env.MYSQL_USER,
    dialectModule: mysql2,
    dialect: 'mysql',
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
})

export default NextAuth({
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_APP_ID as string,
            clientSecret: process.env.FACEBOOK_APP_SECRET as string,
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
                    sourire: 0,
                    pastEvent: []
                }
            },
        })
    ],
    adapter: SequelizeAdapter(sequelize, {
        models: {
            User: sequelize.define('user', {
                ...models.User,
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
                sourire: DataTypes.INTEGER,
                pastEvent: DataTypes.JSON,
                matchedUser: DataTypes.STRING,
            }),
        }
    }),
    pages: {
        signIn: '/auth/login',
    },
    session: {
        maxAge: 60 * 60 * 24 * 7, // 1 week
    },
    callbacks: {
        async signIn({ user, account, profile }: any) {
            const picture = profile.picture.data.url;
            if (user.image !== picture) {
                await directus.items("users").updateOne(user.id, {
                    image: picture
                })
            }
            return true
        },
        async session({ session, user }) {

            // only enable this on new event
            // const userEvent = ['612c9adb-122a-43aa-83d8-eda6e4bbff51', ...(user.pastEvent as string[])];
            // const refreshedUser = await directus.items("users").updateOne(user.id, {
            //     pastEvent: [...new Set(userEvent)]
            // })

            return {
                ...session,
                user: {
                    ...user,
                }
            }
        }
    }
});
