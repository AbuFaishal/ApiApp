import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import './Apiapp.css';

function CryptoApiApp() {
    //website:https://www.coingecko.com/en/api/documentation?
    //link:https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false
    const[coins,coinsupdate]= useState([]);
    const[search,upsearch]=useState("");
    async function getData(){
        await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then((res)=>{
            //console.log(res.data[0].name);
                coinsupdate(res.data);//passing data if successfully featched .data is in api
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    

    //pagination part
    const[currentpage,updatecurrentpage]=useState(1);
    const[postperpage,setpostperpage]=useState(10);
    //for numbers in pagination
    const[pagenumlimit,updatepagenumlimit]=useState(5);
    const[maxpagelimit,updatemaxpagelimit]=useState(5);
    const[minpagelimit,updateminpagelimit]=useState(0);
    //search button active when true deactive when false
    const[active,update]=useState(false);
    //page dividing code
    const  indexoflastpage=currentpage*postperpage;
    const indexoffirstpage=indexoflastpage-postperpage;
    const currentlist=coins.slice(indexoffirstpage,indexoflastpage);

    function toggling(event){
        if(event.target.value!=""){
            update(true);
            upsearch(event.target.value);
        }
        else{
            update(false);
        }
    }
     //filter code
     const filtercoins=coins.filter(data=>
        data.name.toLowerCase().includes(search.toLowerCase())
    )
    
    let datacome=[];
    if(active){
        datacome=filtercoins;
    }
    else{
        datacome=currentlist;
    }
    const paginate=(pagenum)=>{
        updatecurrentpage(pagenum);
    }
    //next and previous button
    let prevBut=()=>{
        updatecurrentpage(currentpage-1);
        if((currentpage-1)%pagenumlimit==0){
            updatemaxpagelimit(maxpagelimit-pagenumlimit);
            updateminpagelimit(minpagelimit-pagenumlimit);
        }
    }
    let nextBut=(maxpagenum)=>{
        updatecurrentpage(currentpage+1);
        if(currentpage+1>pagenumlimit && maxpagelimit<maxpagenum){
            updatemaxpagelimit(maxpagelimit+pagenumlimit);
            updateminpagelimit(minpagelimit+pagenumlimit);
        }
    }
    
    useEffect(()=>{
        getData();
    },[search])//whenever search it will update
    /*
    for continous update
    useEffect(()=>{
        getData();
        console.log("hii");
    })
    */
   /*
    for only one time call
    useEffect(()=>{
        getData();
        console.log("hii");
    },[])
    */
    
    return (
        <>
            <h3 className="bg-light text-center text-warning p-2 mt-3 headingcrypto">Showing crypto currency data</h3>
            <div className="container pb-2">
                <div className="row p-3">
                    <div className="col">
                        <div className="input-group mx-auto">
                        <input type="text" className="form-control srchbar" placeholder="Search currency" aria-label="Search"
                            aria-describedby="search-addon" onChange={toggling}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="table-responsive-sm">
                            <table className="table table-sm table-bordered text-dark text-center table-light">
                                <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Coin</th>
                                    <th>Price</th>
                                    <th>Price Change</th>
                                    <th>Market Cap</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    datacome.map((coin)=>{
                                        
                                        return(
                                            <>
                                            <tr>
                                                <td>{coin.market_cap_rank}</td>
                                                <td>
                                                <b>{coin.name}</b>
                                                <img src={coin.image} style={{borderRadius:"50%",marginLeft:"20px",height:"30px",width:"30px"}} alt="" />
                                                </td>
                                                <td>Rs {(coin.current_price*74.35).toFixed(2)}</td>
                                                <td>{
                                                    coin.price_change_percentage_24h>=0?(
                                                    <b style={{color:"green"}}>+{coin.price_change_percentage_24h.toFixed(2)}</b>):
                                                    <b style={{color:"red"}}>{coin.price_change_percentage_24h.toFixed(2)}</b>
                                                }
                                                </td>
                                                <td>{coin.market_cap}</td>
                                            </tr>
                                            </>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                        
                        <Pagination
                            totalpage={coins.length}
                            postperpage={postperpage}
                            paginate={paginate}
                            currentpage={currentpage}
                            maxpage={maxpagelimit}
                            minpage={minpagelimit}
                            prevBut={prevBut}
                            nextBut={nextBut}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CryptoApiApp
