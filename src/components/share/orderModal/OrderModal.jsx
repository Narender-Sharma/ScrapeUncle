import React, {useState} from 'react'
import Validation from '../../../form/Validation';
export const OrderModal = ({OrderUpdate,setPayload,payload,orderModel,setOrderModel,weightList}) => {
    console.log(payload, 'payload')
    const [form, setForm] = useState(payload);
    const [errorMsg, setErrorMsg] = useState('');
    const HandleChange = (e)=>{
        const {name,value} = e.target;
        let isValid = isAllowed(value, name);
        if (isValid) {
         setForm({ ...form, [name]: value });
         
         }
     }
     const Today = new Date().toISOString().split("T")[0];
     const isAllowed = (value, type) => {
        switch (type){
          case 'name':
            return (value === '' || (Validation.validateChar(value) && value.length < 51)); 
          case 'is_active':
            return  true;
          default:
            return  true;
        }
      }
    
      setPayload(form);
      console.log(form, 'form')
  return (
    <>
        <div className="modal fade bs-example-modal-lg show" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-modal="true" style={{display: 'block'}}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title mt-0" id="myLargeModalLabel"> Measurement</h6>
                        <button type="button" className="btn-close" onClick={()=>setOrderModel(!orderModel)} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="form-label" htmlFor="userName">Name</label>
                                    <input type="text" className="form-control" id="userName" name='userName' disabled={true} value={form.userName} required="" onChange={(e)=>HandleChange(e)}/>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label" htmlFor="mobile">Mobile</label>
                                    <input type="text" className="form-control" id="mobile" name='mobile' disabled={true} value={form.mobile} required="" onChange={(e)=>HandleChange(e)}/>
                                </div>
                                <div className="col-md-6 ">
                                    <label className="form-label mt-2" htmlFor="email">E-mail</label>
                                    <input type="text" className="form-control" id="email" name='email' disabled={true} value={form.email} required="" onChange={(e)=>HandleChange(e)}/>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label mt-2" htmlFor="gender">Gender</label>
                                    <select className="form-control" name='gender' value={form.city} disabled={true} onChange={(e)=>HandleChange(e)}>
                                        <option value={'male'}>Male</option>
                                        <option value={'female'}>Female</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label mt-2" htmlFor="city">city</label>
                                    <input type="text" className="form-control" id="city" name='city' disabled={true} value={form.city} required="" onChange={(e)=>HandleChange(e)}/>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label mt-2" htmlFor="weight">weight</label>
                                    <input type="text" className="form-control" id="weight" name='weight' value={form.weight} required="" onChange={(e)=>HandleChange(e)}/>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label mt-2" htmlFor="date">Date</label>
                                    <input type="date" className="form-control datepicker-input" id='date'  name="date" min={Today} value={new Date(form.date).toISOString().split("T")[0]} onChange={(e)=>HandleChange(e)}/>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label mt-2" htmlFor="time">Time</label>
                                    <input type="time" className="form-control datepicker-input" id='time'  name="time" min={Today} value={form.time} onChange={(e)=>HandleChange(e)}/>
                                </div>
                                {weightList.length > 0 && <div className="col-md-6">
                                    <label className="form-label mt-2" htmlFor="weightId">Weight Type</label>
                                    <select className="form-control" name='weightId' value={form.weightId} onChange={(e)=>HandleChange(e)}>
                                        {
                                            weightList.map((item,index)=>(
                                                <option selected={item.id === form.weightId?'selected':'' } value={item.id} key={index}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>}
                                <div className="col-md-6">
                                    <label className="form-label mt-2" htmlFor="categoryName">Category Name</label>
                                    <input type="text" className="form-control" id="categoryName" name='categoryName' disabled={true} value={form.categoryName} required="" onChange={(e)=>HandleChange(e)}/>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label mt-2" htmlFor="city">Address</label>
                                    <textarea type="text" className="form-control"  disabled={true} value={`${form.address_line_1}, ${form.address_line_2}`} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label mt-2" htmlFor="address_type">Address Type</label>
                                    <input type="text" className="form-control" id='address_type'  name="address_type" value={form.address_type} disabled={true}/>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label mt-2" htmlFor="message">Message</label>
                                    <textarea type="text" className="form-control" name='message' id='message'  value={`${form.message}`} onChange={(e)=>HandleChange(e)} />
                                </div>
                                
                                <div className="col-md-6">
                                    <label className="form-label mt-2" htmlFor="PhoneNo">Order Status</label><br/>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="is_active" id="inlineRadio1" checked={form.is_active ==1?true:false} value="1" onChange={(e)=>HandleChange(e)}/>
                                        <label className="form-check-label" htmlFor="inlineRadio1">Active</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="is_active" id="inlineRadio2" checked={form.is_active ==0?true:false} value="0" onChange={(e)=>HandleChange(e)}/>
                                        <label className="form-check-label" htmlFor="inlineRadio2">in Active</label>
                                    </div>
                                </div>
                                

                            </div>
                            <button type="button" className="btn btn-sm btn-primary mt-2" onClick={()=>OrderUpdate()}>Save</button> &nbsp;
                            <button type="button" className="btn btn-sm btn-danger mt-2" onClick={()=>setOrderModel(!orderModel)}>Cancel</button>             
                        </form>  
                    </div>
                </div>
            </div>
        </div>
        <div className='modal-backdrop fade show'></div>
    </>
  )
}