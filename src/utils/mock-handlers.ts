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

    users: rest.get(`https://social-network.samuraijs.com/api/1.0/users?page=1&count=20`, (req, res, ctx) => {
        return res(ctx.json({
            "items": [
                {
                    "name": "ntjkjubz",
                    "id": 28043,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "podnes",
                    "id": 28042,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "pondes",
                    "id": 28041,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "Thundery11",
                    "id": 28040,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": true
                },
                {
                    "name": "Thundery1",
                    "id": 28039,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": true
                },
                {
                    "name": "Alesher",
                    "id": 28038,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": true
                },
                {
                    "name": "MarioVeljanov",
                    "id": 28037,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "nirvxnx",
                    "id": 28036,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "VladislavPets",
                    "id": 28035,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "APILOGINAPI",
                    "id": 28034,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "gam_bu7ger",
                    "id": 28033,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": "gym_developer_228",
                    "followed": false
                },
                {
                    "name": "ssoooyaa",
                    "id": 28032,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "Andrei1808",
                    "id": 28031,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "Coggitare",
                    "id": 28030,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "lelouch187",
                    "id": 28029,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "Alex2190",
                    "id": 28028,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": true
                },
                {
                    "name": "Smart-Ape",
                    "id": 28027,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "vlad_6521891",
                    "id": 28026,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "Vinston33",
                    "id": 28025,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "Vinston",
                    "id": 28024,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                }
            ],
            "totalCount": 23051,
            "error": null
        }), ctx.delay(150))
    }),

    users5: rest.get(`https://social-network.samuraijs.com/api/1.0/users?page=5&count=20`, (req, res, ctx) => {
        return res(ctx.json({
            "items": [
                {
                    "name": "pavellog",
                    "id": 27964,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "andrew__1996",
                    "id": 27963,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "klon",
                    "id": 27962,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "Kewinosec",
                    "id": 27961,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": true
                },
                {
                    "name": "Kewin",
                    "id": 27960,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "volodymyrdnv",
                    "id": 27959,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "vvv81818",
                    "id": 27958,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "levchuk",
                    "id": 27957,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": true
                },
                {
                    "name": "John Doe",
                    "id": 27956,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": "https://social-network.samuraijs.com/activecontent/images/users/27956/user-small.jpg?v=1",
                        "large": "https://social-network.samuraijs.com/activecontent/images/users/27956/user.jpg?v=1"
                    },
                    "status": "Click to change status",
                    "followed": false
                },
                {
                    "name": "potential_hirer",
                    "id": 27955,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": true
                },
                {
                    "name": "TanTaJIoS",
                    "id": 27954,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": true
                },
                {
                    "name": "kumiho",
                    "id": 27953,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": true
                },
                {
                    "name": "cocojambo",
                    "id": 27952,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "leraKuz",
                    "id": 27951,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": true
                },
                {
                    "name": "robertch",
                    "id": 27950,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "Xamana",
                    "id": 27949,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "Nyjat",
                    "id": 27948,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "user_03951",
                    "id": 27947,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "vlad_05139",
                    "id": 27946,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": null,
                        "large": null
                    },
                    "status": null,
                    "followed": false
                },
                {
                    "name": "elena_sergeeva",
                    "id": 27945,
                    "uniqueUrlName": null,
                    "photos": {
                        "small": "https://social-network.samuraijs.com/activecontent/images/users/27945/user-small.jpg?v=1",
                        "large": "https://social-network.samuraijs.com/activecontent/images/users/27945/user.jpg?v=1"
                    },
                    "status": "this is my first status :)",
                    "followed": false
                }
            ],
            "totalCount": 23052,
            "error": null
        }), ctx.delay(150))
    }),

    usersError: rest.get('https://social-network.samuraijs.com/api/1.0/users', (req, res, ctx) => {
        const count = req.url.searchParams.get('count')
        const page = req.url.searchParams.get('page')
        return res(ctx.status(500), ctx.json({count, page}))
    }),

    follow: rest.post('https://social-network.samuraijs.com/api/1.0/follow/28043', (req, res, ctx) => {
        return res(
            ctx.json({
                data: {}, messages: [], fieldsErrors: [], resultCode: 0
            }), ctx.delay(150)
        )
    }),

    unfollow: rest.delete('https://social-network.samuraijs.com/api/1.0/follow/28043', (req, res, ctx) => {
        return res(
            ctx.json({
                data: {}, messages: [], fieldsErrors: [], resultCode: 0
            })
        )
    })
}
