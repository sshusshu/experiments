const API_END_POINT = 'https://api.thecatapi.com/v1'

const request = async (url)=>{
    try{
        const response = await fetch(url);
        if(!response.ok){
            const data = await response.json();
            return data;
        }else{
            const errorData = await response.json();
            throw errorData;
        }
    }catch(err){
        throw{
            message: err.message,
            status: err.status
        }
    }
}

const api = {
    fetchCats : async (keyword) => {
        try{
            const breeds = await request(`${API_END_POINT}/breeds/search?q=${keyword}`)
            const requests = breeds.map(async breed => {
                return await request(`${API_END_POINT}/images/search?limit=20&breed_ids=${breed.id}`)
            })

            const responses = await Promise.all(requests);
            const result = Array.prototype.concat.apply([],responses);

            return {
                isError: false,
                data: result
            }
        }catch(err){
            return {
                isError: true,
                data : err
            }
        }
    },
    fetchRandomCats : async() =>{
        const result = await request(`${API_END_POINT}/images/search?limit=20`)
        try{
            return {
                isError : false,
                data: result
            }
        }catch(err){
            return{
                isError:true,
                data:err
            }
        }
    }
}

export {api}