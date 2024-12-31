let tweets = [
    {
        id: '1',
        text: `Hello, It's me`,
        createdAt: Date.now().toString(),
        name: "Bob",
        username: "bob"
    },
    {
        id: '2',
        text: `Hi, It's me`,
        createdAt: Date.now().toString(),
        name: "Ellie",
        username: "ellie"
    }
]

export async function getAll(){
    return tweets;
}

export async function getAllByUsername(username){
    return tweets.filter(t => t.username === username)
}

export async function getAllById(id){
    return tweets.find(t => t.id === id);
}

export async function create(text, name, username){
    const tweet = {
        id : Date.now().toString(),
        text,
        createdAt : new Date(),
        name,
        username
    } 
    tweets = [tweet, ...tweets]
    return tweet
}

export async function update(id, text){
    const tweet = tweets.find(t => t.id === id)
    if(tweet){
        tweet.text = text
    }
    return tweet;
}   

export async function remove(id){
    return tweets.filter(t => t.id !== id)
}