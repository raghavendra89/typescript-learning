type Role = 'admin' | 'user' | 'super-admin';

interface User {
    id: number,
    firstName: string,
    lastName: string,
    isAdmin: boolean,
    readonly role: Role,
    // posts: Array<Post>
    posts: Post[]
}

interface Post {
    id: number,
    title: string
}

const defaultUser: User = {
    id: 1,
    firstName: 'Raj',
    lastName: 'M',
    isAdmin: true,
    role: 'admin',
    posts: [
        {
            id: 1,
            title: 'Hello World!'
        }
    ]
};

const getUserId = (user: User): number => {
    return user.id;
}

const makeUser = (): User => {
    return {
        id: 10,
        firstName: 'Hari',
        lastName: 'M',
        isAdmin: false,
        role: 'user',
        posts: [
            {
                id: 1,
                title: 'Hello World!'
            }
        ]
    };
}

console.log(getUserId(defaultUser));