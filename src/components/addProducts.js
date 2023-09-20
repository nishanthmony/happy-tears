import React,{useState} from 'react'
import { fs, storage } from '../Config/config'

export const AddProducts = () => {

  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Price, setPrice] = useState('');
  const [Image, setImage] = useState(null);

  const [ImageError, setImageError] = useState('');

  const [SuccessMsg, setSuccessMsg] = useState('');
  const [UploadError, setUploadError] = useState('');

  const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];
  const handleProductImg=(e)=>{
    let selectedFile = e.target.files[0];
    if(selectedFile){
        if(selectedFile&&types.includes(selectedFile.type)){
            setImage(selectedFile);
            setImageError('');
        }else{
            setImage(null);
            setImageError('Please Select a valid Image')
        }
    }else{
        console.log('Please select your file')
    }
  }

  const handleAddProducts = (e) =>{
    e.preventDefault();
    //console.log(Title, Description, Price);
    //console.log(Image);
    const uploadTask = storage.ref(`product-images/${Image.name}`).put(Image);
    uploadTask.on('state_changed', snapshot=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
        console.log(progress);
    }, error=>setUploadError(error.message),()=>{
        storage.ref('product-images').child(Image.name).getDownloadURL().then(url=>{
            fs.collection('Products').add({
                Title,
                Description,
                category,
                Price: Number(Price),
                url
            }).then(()=>{
                setSuccessMsg('Product added successfully');
                setTitle('');
                setDescription('');
                setCategory('');
                setPrice('');
                
                document.getElementById('file').value='';
                setImageError('');
                setUploadError('');
                setTimeout(()=>{
                    setSuccessMsg('')
                }, 3000)
            }).catch(error=>setUploadError(error.message));
        })
    })
  }
  //for category state changes
  const [category, setCategory] = useState('');

  return (
    <div className='container'>
        <br></br>
        <br></br>
        <h1>Add Products</h1>
        <hr></hr>
        {SuccessMsg&&<>
            <div className='success-msg'>{SuccessMsg}</div>
        </>}
        <form autoComplete='off' className='form-group' onSubmit={handleAddProducts}>
            <label>Product Title</label>
            <input type='text' className='form-control' required onChange={(e)=>setTitle(e.target.value)} value={Title}/>
            <br></br>
            <label>Product Description</label>
            <input type='text' className='form-control' required onChange={(e)=>setDescription(e.target.value)} value={Description}/>
            <br></br>
            <label>Product Category</label>
            <select className='form-control' required value={category} onChange={(e)=>setCategory(e.target.value)}>
                <option value="">Select Product Category</option>
                <option>Digital Art</option>
                <option>Mossaic Art</option>
                <option>Cartoon Art</option>
                <option>Caricature</option>
                <option>Wood Engraving</option>
                <option>Mini Frames</option>
                <option>Magic Mirror</option>
                <option>Heart Collage</option>
            </select>
            <br></br>
            <label>Product Price</label>
            <input type='number' className='form-control' required onChange={(e)=>setPrice(e.target.value)} value={Price}/>
            <br></br>
            <label>Upload Product</label>
            <input type='file' id='file' className='form-control' required onChange={handleProductImg}/>
            <br></br>
            {ImageError&&<>
                <br></br>
                <div className='error-msg'>{ImageError}</div>
            </>}
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <button type='submit' className='btn btn-success btn-md'>SUBMIT</button>
            </div>
        </form>
        {UploadError&&<>
            <br></br>
            <div className='error-msg'>{UploadError}</div>
        </>}
    </div>
  )
}
