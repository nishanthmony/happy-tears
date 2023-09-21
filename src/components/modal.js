import React, { useState } from 'react'
import { auth, fs } from '../Config/config';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const Modal = ({ totalQty, TotalPrice, hideModal }) => {


    const [cell, setCell] = useState(null);
    const [cartPrice] = useState(TotalPrice);
    const [residentialaddress, setResidentialAddress] = useState('');
    const [cartQty] = useState(totalQty);

    const history = useHistory();
    
    const handleCloseModal=()=>{
        hideModal();
    }

    const [successMsg, setSuccessMessage] = useState('');

    //cash on delivery
    const handleCashOnDelivery=async(e)=>{
        e.preventDefault();
        //console.log(cell, residentialaddress, cartPrice, cartQty);
        const uid = auth.currentUser.uid;
        const userData = await fs.collection('users').doc(uid).get();
        await fs.collection('Buyer-Personal-Info').add({
            Name: userData.data().Fullname,
            Email: userData.data().Email,
            MobileNo: cell, 
            ResidentialAddress: residentialaddress,
            CartPrice: cartPrice,
            CartQty: cartQty
        })
        const cartData = await fs.collection('Cart '+uid).get();
        for (var snap of cartData.docs){
            var data = snap.data();
            data.ID = snap.id;
            await fs.collection('Buyer-Cart '+uid).add(data);
            await fs.collection('Cart '+uid).doc(snap.id).delete();
        }
        hideModal();
        setSuccessMessage('Login Successful, welcome to the world of Surprises');
        setTimeout(()=>{
            setSuccessMessage('');
            history.push('/home');
        })
    }
  return (
    <div className='shade-area'>
        <div className='modal-container'>
        <form className='form-group' onSubmit={handleCashOnDelivery}>
            <input type='number' className='form-control' placeholder='Mobile No' required onChange={(e)=>setCell(e.target.value)} value={cell}/>
            <br></br>
            <input type='text' className='form-control' placeholder='Residential Address' required onChange={(e)=>setResidentialAddress(e.target.value)} value={residentialaddress}/>
            <br></br>
            <label>Total Quantity</label>
            <input type='text' className='form-control' readOnly required value={cartQty}/>
            <br></br>
            <label>Total Price</label>
            <input type='text' className='form-control' readOnly required value={cartPrice}/>
            <br></br>
            <button type='submit' className='btn btn-success btn-md'>SUBMIT</button>
        </form>
        <div className='delete-icon' onClick={handleCloseModal}> x </div>
        </div>
        {successMsg&&<>
            <div className='success-msg'>{successMsg}</div>        
        </>}
    </div>
  )
}
