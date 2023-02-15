import {rest} from "msw";

export const handlers = {
    auth: rest.get('https://social-network.samuraijs.com/api/1.0/auth/me', (req, res, ctx) => {
        return res(
            ctx.json({
                "data": {"id": 18046, "login": "mnishek", "email": "m_mnishek@inbox.ru"},
                "messages": [],
                "fieldsErrors": [],
                "resultCode": 0
            }), ctx.delay(150)
        )
    }),

    users: rest.get(`https://social-network.samuraijs.com/api/1.0/users`, (req, res, ctx) => {
        const count = req.url.searchParams.get('count')
        const page = req.url.searchParams.get('page')

        return res(ctx.json({
            count,
            page,
            "items": [
                {
                    "name": "Kira_Yoshikage",
                    "id": 27943,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": "https://social-network.samuraijs.com/activecontent/images/users/6985/user-small.jpg?v=1",
                        "large": "https://social-network.samuraijs.com/activecontent/images/users/6985/user.jpg?v=1"
                    },
                    "status": "safdasfasffsad]i8i78",
                    "followed": false
                },
                {
                    "name": "upravdom",
                    "id": 6984,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "antoha_ale6",
                    "id": 6983,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": "",
                    "followed": false
                },
                {
                    "name": "vladbelozertsev",
                    "id": 6982,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": "my",
                    "followed": false
                },
                {
                    "name": "Serge 11",
                    "id": 6981,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": "https://social-network.samuraijs.com/activecontent/images/users/6981/user-small.jpg?v=1",
                        "large": "https://social-network.samuraijs.com/activecontent/images/users/6981/user.jpg?v=1"
                    },
                    "status": "",
                    "followed": true
                },
                {
                    "name": "vicinicin",
                    "id": 6980,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": "7898815",
                    "followed": false
                },
                {
                    "name": "ruslan90t",
                    "id": 6979,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "maksym0",
                    "id": 6978,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "SergeyDef",
                    "id": 6977,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "Sayyora",
                    "id": 6976,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": true
                }
            ],
            "totalCount": 22977,
            "error": null
        }), ctx.delay(150))
    }),

    usersError: rest.get('https://social-network.samuraijs.com/api/1.0/users', (req, res, ctx) => {
        const count = req.url.searchParams.get('count')
        const page = req.url.searchParams.get('page')
        return res(ctx.status(500), ctx.json({count, page}))
    })
}
