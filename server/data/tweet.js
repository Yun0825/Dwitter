import * as userRepository from '../data/auth.js'

let tweets = [
    {
        id: '1',
        text: `Hello, It's me`,
        createdAt: Date.now().toString(),
        userId : '1'
    },
    {
        id: '2',
        text: `Hi, It's me`,
        createdAt: Date.now().toString(),
        userId : '2'
    }
]

export async function getAll(){
    return Promise.all(
        tweets.map(async (tweet) => {
            const {username, name, url} = await userRepository.findById(tweet.userId);
            return {...tweet, username, name, url}
        })
    );
}

export async function getAllByUsername(username){
    return getAll().then((tweet) => tweet.username === username)
}

export async function getAllById(id){
    const found = tweets.find(t => t.id === id);
    if(!found){
        return null;
    }

    const {username, name, url} = await userRepository.findById(id);
    return {...found, username, name, url}
}

export async function create(text, userId){
    const tweet = {
        id : new Date().toString(),
        text,
        createdAt : new Date(),
        userId
    };

    tweets = [tweet, ...tweets]
    return getAllById(tweet.id)
}

export async function update(id, text){
    const tweet = tweets.find(t => t.id === id)
    if(tweet){
        tweet.text = text
    }
    return getAllById(tweet.id);
}   

export async function remove(id){
    return tweets.filter(t => t.id !== id)
}