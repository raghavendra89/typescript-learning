interface User {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
}

const fetchFromAPI = async (): Promise<User> => {
    const data: User = await fetch('https://swapi.dev/api/people/1').then((res) => {
        return res.json();
    });

    return data;
}

console.log(fetchFromAPI());