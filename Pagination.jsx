import React from 'react'
import './Apiapp.css';
function Pagination({totalpage,postperpage,paginate,currentpage,maxpage,minpage,prevBut,nextBut}) {//we can also use single variable props

    let pagenumbers=[];
    for(let i=1;i<=Math.ceil(totalpage/postperpage);i++){
        pagenumbers.push(i);
    }
    //storing maximum page generates
    let maxnum=pagenumbers.length;
    console.log(minpage,maxpage);
    return (
        <>
            <div className="pagination">
            {//if current page number become 1 prev button will be invisible
                currentpage>1?
                <button onClick={()=>{prevBut()}} className="mx-2">{'<-'}</button>
                :null}
                {
                    pagenumbers.map((number)=>{
                        if(number<maxpage+1 && number>minpage){
                        return(
                            <>
                            <li 
                             className={currentpage==number?"currp":null}//adding class currp when current page equal to number value
                             onClick={()=>paginate(number)}
                             key={number}>
                             <a href="#">{number}</a>
                             </li>
                            </>
                        )
                        }
                        else{
                            return null;
                        }
                    })
                    //here passing maximum number of page generates in button on click
                    //and when current page number exceed next button will be invisible
                }
                {currentpage<maxnum?
                <button onClick={()=>{nextBut(maxnum)}} className="mx-2">{'->'}</button>
                :null}
            </div>
        </>
    )
}

export default Pagination
