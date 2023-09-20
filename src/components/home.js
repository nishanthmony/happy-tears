import React, { useState, useEffect } from 'react'
import { Navbar } from './navbar'
import { Products } from './products'
import {IndividualFilteredProducts} from './individualFilteredProducts'
import { auth, fs } from '../Config/config'
import { HappyTears } from './happyTears'

export const Home = (props) => {
  //getting current user uid
  function GetUserUid(){
    const [uid, setUid] = useState(null);
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if(user){
          setUid(user.uid);
        }
      })
    },[])
    return uid;
  }

  const uid = GetUserUid();


  //current user information fuction
  function GetCurrentUser(){
    const [user, setUser] = useState(null);
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if (user) {
          fs.collection('users').doc(user.uid).get().then(snapshot=>{
            setUser(snapshot.data().Fullname)
          })
        }else{
          setUser(null);
        }
      })

    }, [])
    return user;
  }

  const user = GetCurrentUser();
  //console.log(user)

  //State of Products
  const [DisplayProducts, setDisplayProducts] = useState([]);

  const getProducts = async () =>{
    const DisplayProducts = await fs.collection('Products').get();
    const ProductsArray = [];
    for (var snap of DisplayProducts.docs){
      var data = snap.data();
      data.ID = snap.id;
      ProductsArray.push({
        ...data
      })
      if(ProductsArray.length === DisplayProducts.docs.length){
        setDisplayProducts(ProductsArray);
      }
    }
  }

  useEffect(()=>{
    getProducts();
  },[])

  //state of total products in cart that will be displayed in the cart button on the navbar
  const [totalProducts, setTotalProducts] = useState(0);
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        fs.collection('Cart '+user.uid).onSnapshot(snapshot=>{
          const qty = snapshot.docs.length;
          setTotalProducts(qty);
        })
      }
    })
  },[])

  let DisplayProd;

  const addToCart = (DisplayProducts) =>{
    if(uid!==null){
      //console.log(DisplayProducts);
      DisplayProd = DisplayProducts
      DisplayProd['qty'] = 1;
      DisplayProd['TotalProductPrice'] = DisplayProd.qty*DisplayProd.Price;
      fs.collection('Cart ' + uid).doc(DisplayProducts.ID).set(DisplayProd).then(()=>{
        console.log('Successfully added to cart')
      })
    }else{
      props.history.push('/login')
    }
  }

  //categories list rendering using span
  const [spans] = useState([
    {id: 'DigitalArt', text:'Digital Art'},
    {id: 'MossaicArt', text:'Mossaic Art'},
    {id: 'CartoonArt', text:'Cartoon Art'},
    {id: 'Caricature', text:'Caricature'},
    {id: 'WoodEngraving', text:'Wood Engraving'},
    {id: 'MiniFrames', text:'Mini Frames'},
    {id: 'MagicMirror', text:'Magic Mirror'},
    {id: 'HeartCollage', text:'Heart Collage'},
  ])


  //handleChange function
  const [active, setActive] = useState('');
  const [category, setCategory] = useState('');

  const handleChange = (individualSpan) =>{
    setActive(individualSpan.id);
    setCategory(individualSpan.text);
    filterFunction(individualSpan.text);
  }

  // filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);

  //filter function
  const filterFunction = (text) =>{
    const filter = DisplayProducts.filter((DisplayProducts)=>DisplayProducts.Title===text);
    setFilteredProducts(filter);
  }

  //allproducts display
  const returnToAllProducts = () => {
    setActive('');
    setCategory('');
    setFilteredProducts([]);
  }

  return (
    <div>
        <Navbar user={user} totalProducts={totalProducts}/>
        <br></br>
        <HappyTears />
        <div className='container-fluid filter-products-main-box' >
          <div className='filter-box'>
            <h6>Filter by category</h6>
            {spans.map((individualSpan, index)=>(
              <span key={index} id={individualSpan.id} onClick={()=>handleChange(individualSpan)} className={individualSpan.id===active ? active:'deactive'}>{individualSpan.text}</span>

            ))}
          </div>
          {filteredProducts.length > 0 &&(
            <div className='my-products'>
              <h1 className='text-center'>{category}</h1>
              <a href="javascript:void(0)" onClick={returnToAllProducts}>Return to All Products</a>
              <div className='products-box'>
                {filteredProducts.map(individualFilteredProducts=>(
                  <IndividualFilteredProducts key={individualFilteredProducts.ID}
                  individualFilteredProducts = {individualFilteredProducts} addToCart = {addToCart}/>
                ))}
              </div>
            </div>
          )}
          {filteredProducts.length < 1 &&(
            <>
              {DisplayProducts.length > 0 && (
                <div className='my-products'>
                  <h1 className='text-center'>All Products</h1>
                  <div className='products-box'>
                    <Products DisplayProducts = {DisplayProducts} addToCart = {addToCart}/>
                  </div>
                </div>
              )}
              {DisplayProducts.length < 1 && (
                <div className='my-products please-wait'>Please wait...</div>
              )}
            </>
          )}
        </div>
    </div>
  )
}
