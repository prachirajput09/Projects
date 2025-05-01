import React, { useEffect,useState, useSyncExternalStore } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const  News =(props)=>{
const[articles,setArticles]=  useState([])
const[loading,setLoading]=  useState(true)
const[page,setPage]=  useState(1)
const[totalResults,setTotalResults]=  useState(0)
//document.title=`${capitalizeFirstLetter(props.category)}-News App`
  
const capitalizeFirstLetter=(string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const updateNews=async()=>{
      props.setProgress(10);
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page= ${page}&pageSize=${props.pageSize}`;
      setLoading(true)  
      let data= await fetch(url);
        let parsedData=await data.json()
        console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
      } 
    useEffect(()=>{
      document.title=`${capitalizeFirstLetter(props.category)}-News App`
      updateNews();
      //eslint-disable-next-line
     },[])
     
    const handlePrevClick = async()=>{
        // console.log("prev");
        // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e0bf6b99ba274e929b45c898fa8738cc&page=${this.state.page-1}&pageSize=${props.pageSize}`;
        // this.setState({loading:true});
        // let data= await fetch(url);
        // let parsedData=await data.json()
        // console.log(parsedData);
        // this.setState({
        //   page: this.state.page-1,
        //   articles:parsedData.articles       
        // })
        setPage(page-1)
        updateNews();

      }
      const  handleNextClick =  async()=>{
        console.log("next");
        //if(!(this.state.page+1>Math.ceil(this.state.totalResults/10))){
        //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e0bf6b99ba274e929b45c898fa8738cc&page=${this.state.page+1}&pageSize=${props.pageSize}`;
        //   this.setState({loading:true});
        // let data= await fetch(url);
        // let parsedData=await data.json()
        // console.log(parsedData);
        // //zthis.setState({articles:parsedData.articles})

        // this.setState({
        //   page: this.state.page+1,
        //   articles:parsedData.articles,
        //   loading:false
        // })
        setPage(page+1)
        updateNews();
        } 

         const fetchMoreData = async () => {
         const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e0bf6b99ba274e929b45c898fa8738cc&page= ${page+1}&pageSize=${props.pageSize}`;
         setPage(page+1)
         // this.setState({loading:true});
          let data= await fetch(url);
          let parsedData=await data.json()
          console.log(parsedData);
        // this.setState({articles:this.state.articles.concat(parsedData.articles),totalArticles:parsedData.totalResults, loading:false
            
        // })
          setArticles(articles.concat(parsedData.articles))
          setTotalResults(parsedData.totalResults)
          
        };
      return (
      <>
      {/* // <div className="container my-3"> */}
        <h1 className="text-center" style={{margin:'35px 0px',marginTop:'90px'}}>News App -Top  {capitalizeFirstLetter(props.category)} Headlines</h1>
         {loading && <Spinner/>} 
        {/* <h2> News App -Top Headlines</h2> */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={ articles.length!==totalResults}
          loader={<Spinner/>}

        >
          <div className="container">
        <div className="row">
        {/* {!this.state.loading && this.state.articles.map((element)=>{ */}
        {articles.map((element)=>{
             return <div className="col-md-4" key={element.url}>
               <NewsItem  title={element?element.title:""} description={element.description?element.description:""} imageurl={element.urlToImage} newsUrl={element.url} author={element.author } date={element.publishedAt}  source={element.source.name}/>
          </div>
          
          // <div className="col-md-4"> <NewsItem key={element.url} title={element.title} description={element.description} imageurl={element.urlToImage} newsUrl="TODO"/>
          // </div> 
        })}
        
        </div>
        </div>
        </InfiniteScroll>
        
        
      {/* <div className="col-md-4">
        <NewsItem title="mytitle" description="mydesc" imageurl="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcR6AK1OtJ2FXnHR6omrAJwzJUpDnlRN4K-L3NfsTyFLYE2M4MFb26tkd0lxmNiNcEtINJw_Bjvc3RrQysQ"/>
        </div>
        <div className="col-md-4">
        <NewsItem title="mytitle" description="mydesc" imageurl="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcR6AK1OtJ2FXnHR6omrAJwzJUpDnlRN4K-L3NfsTyFLYE2M4MFb26tkd0lxmNiNcEtINJw_Bjvc3RrQysQ"/>
        </div> */}
        {/* <div className="col-md-4">
        <NewsItem title="mytitle" description="mydesc"/>
        </div> */}
        
        {/* <div className="container d-flex justify-content-between">
        <button  disabled={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button  disabled= {this.state.page+1>Math.ceil(this.state.totalResults/props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}> Next &rarr;</button>
        </div> */}
        </>
       )
  }

News.defaultProps = {
  country:'us',
  pageSize:5,
  category:'general',
  }

News.propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }

export default News