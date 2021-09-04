import { getItem,setItem } from "./src/util/sessionStorage.js";
import Result from "./src/components/Result.js"
import SearchBar from "./src/components/Search.js";
import Loading from "./src/components/Loading.js";
import DetailModal from "./src/components/DetailModal.js";
import { api } from "./src/api/theCatAPI.js";



export default class App{
    constructor($target){
        const keywords = getItem('keywords');
        const data = getItem('data')

        const searchbar = new SearchBar({
            $target,
            keywords,
            onSearch : async keyword => {
                Loading.toggleSpinner();

                const response = await api.fetchCats(keyword);
                if(!response.isError){
                    setItem('data',response.data);
                    Result.setState(response.data);
                    Loading.toggleSpinner();
                }else{
                    error.setState(response.data)
                }
        
            },
            onRandom: async() => {
                Loading.toggleSpinner();

                const response = await api.fetchRandomCats();
                if(!response.isError){
                    setItem('data',response.data);
                    Result.setState(response.data);
                    Loading.toggleSpinner();
                }else{
                    error.setState(response.data);
                }
            }
        })


        const resultsSection = new ResultSection({
            $target,
            data,
            onClick: data =>{
                detailModal.setState(data);
            },
            onScroll : async()=>{
                loading.toggleSpinner();

                const response = await api.fetchRandomCats();
                if(!response.isError){
                    const beforeData = getItem('data');
                    const nextData = beforeData.concat(response.data);
                    
                }

            }
        })

        const detailModal = new DetailModal({
            $target
        });

        const loading = new Loading({
            $target
        })

        const error = new Error({
            $target
        })

        const darkmodeBtn = document.createElement('span');
        darkmodeBtn.className = 'darkmode-btn';
        darkmodeBtn.innerText = '🌕';

        $target.appendChild(darkmodeBtn);


    }


}