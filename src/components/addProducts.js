import React,{useState} from 'react'

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
    console.log(Title, Description, Price)
  }

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
            <br></br>

        </>}
    </div>
  )
}
